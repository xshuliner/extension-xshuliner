/**
 * @description 接口请求管理器
 */
import CacheManager from '@/src/common/kits/CacheManager';
import Utils from '@/src/common/utils';
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import md5 from 'blueimp-md5';
import { v4 as uuidV4 } from 'uuid';

// const { webenv = '' } = buildInfoJson;
// const { brand = '', web = {} } = brandInfo || {};
// const { env = '' } = envInfo || {};
const webenv = 'prod'; // 'prod';
const env = 'EXTENSION';
const brand = 'gatling';
const secretKey = 'I@, ha*ve #187076081$ dream(s)!~';

const web = {
  prod: {
    baseUrl: 'https://www.xshuliner.online/api', // https://www.xshuliner.online/api/smart/v1/tool/getActiveState?queryA=33
  },
  uat: {
    baseUrl: 'https://www.xshuliner.online/apiuat', // https://www.xshuliner.online/apiuat/smart/v1/tool/getActiveState?queryA=www
  },
  local: {
    baseUrl: 'http://localhost:9002/apilocal',
  },
};

interface RequestConfig {
  method?: string;
  url: string;
  header?: Record<string, string>;
  query?: Record<string, any>;
  body?: Record<string, any>;
  isShowLoading?: boolean;
  isShowToast?: boolean;
  isRepeatAuth?: boolean;
  timeout?: number;
  [key: string]: any;
}

interface UploadConfig extends RequestConfig {
  file?: {
    filePath?: string;
    [key: string]: any;
  };
}

interface ApiResponse {
  statusCode?: number;
  data?: any;
  [key: string]: any;
}

const getApiHeaders = async (params: {
  path: string;
  query: Record<string, any>;
  body: Record<string, any>;
  token: string;
}): Promise<{
  urlAndQuery: string;
  token: string;
  t: string;
  k: string;
  requestid: string;
}> => {
  const { path: url, query: queryReq = {}, body: bodyReq = {} } = params || {};
  const queryReqReal = Utils.traverseObject({
    obj: queryReq,
    modifier: (key, value) => {
      return String(value);
    },
  });
  const urlAndQuery = Utils.router2url(url, queryReqReal) as string;
  const { token } = await CacheManager.getSyncStorage(['token']);
  const requestid = uuidV4();
  const t = String(new Date().getTime());
  const k = md5(
    `${requestid.slice(-10)}${t}${url[url.length - 2]}${env}${secretKey}${requestid.slice(0, 10)}${url[url.length - 3]}${t}${brand}` +
      `\t${JSON.stringify(queryReqReal)}\t${JSON.stringify(bodyReq)}`
  );

  return {
    urlAndQuery,
    token,
    t,
    k,
    requestid,
  };
};

/**
 * 显示加载提示（浏览器扩展环境）
 */
const showLoading = (): void => {
  // 在浏览器扩展中，可以通过消息通知 background 或 popup 显示 loading
  // 这里暂时使用 console，实际项目中可以集成 UI 提示
  console.debug('FetchManager: showLoading');
};

/**
 * 隐藏加载提示
 */
const hideLoading = (): void => {
  console.debug('FetchManager: hideLoading');
};

/**
 * 显示 Toast 提示
 */
const showToast = (message: string): void => {
  console.debug('FetchManager: showToast', message);
  // 实际项目中可以集成 UI 提示组件
};

class FetchManager {
  static instance: FetchManager | null = null;

  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    // 找到指定环境的web配置项，默认为prod环境
    const objWeb = web[webenv] ? web[webenv] : web['prod'];
    const { baseUrl } = objWeb || {};

    this.baseUrl = baseUrl || '';

    // 创建 axios 实例
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 20000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('FetchManager getInstance', webenv, objWeb);
  }

  static getInstance(): FetchManager {
    if (!this.instance) {
      this.instance = new FetchManager();
    }
    return this.instance;
  }

  async request(objConfig: RequestConfig): Promise<ApiResponse> {
    let result: ApiResponse = {};

    const {
      method = 'GET',
      url,
      header = {},
      query = {},
      body = {},
      isShowLoading = false,
      isShowToast = false,
      isRepeatAuth: _isRepeatAuth = true,
      timeout = 20000,
      ...otherConfig
    } = objConfig || {};

    // 获取 token
    const storage = await CacheManager.getSyncStorage(['token']);
    const token = storage?.token || null;

    const { t, k, requestid } = await getApiHeaders({
      path: url,
      query,
      body,
      token,
    });

    const fullUrl = url.includes('://') ? url : `${this.baseUrl}${url}`;

    const headers: Record<string, string> = {
      platform: env,
      brand: brand,
      authorization: token ? `Bearer ${token}` : '',
      requestid,
      t,
      k,
      'Content-Type': 'application/json',
      ...header,
    };

    const axiosConfig: AxiosRequestConfig = {
      method: method.toLowerCase() as any,
      url: fullUrl,
      headers,
      params: method === 'GET' || method === 'HEAD' ? query : undefined,
      data: method !== 'GET' && method !== 'HEAD' ? body : undefined,
      timeout,
      ...otherConfig,
    };

    console.debug('FetchManager options', JSON.stringify(axiosConfig, null, 2));

    try {
      if (isShowLoading) {
        showLoading();
      }

      const response: AxiosResponse =
        await this.axiosInstance.request(axiosConfig);

      result = {
        statusCode: response.status,
        data: response.data,
        headers: response.headers as Record<string, any>,
      };

      if (isShowLoading) {
        hideLoading();
      }

      if (isShowToast && result?.statusCode !== 200) {
        showToast(result?.data?.message || 'Request failed');
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as any;
      result = {
        statusCode: axiosError.response?.status || 0,
        data: axiosError.response?.data || error,
        error: axiosError.message || 'Network error',
        headers: (axiosError.response?.headers as Record<string, any>) || {},
      };
      if (isShowLoading) {
        hideLoading();
      }
      if (isShowToast) {
        showToast(errorData?.message || axiosError.message || 'Network error');
      }
    }

    console.debug('FetchManager request', result);
    return result;
  }

  async upload(objConfig: UploadConfig): Promise<ApiResponse> {
    let result: ApiResponse = {};

    const {
      method = 'POST',
      url,
      header = {},
      query = {},
      body = {},
      file = {},
      isShowLoading = false,
      isRepeatAuth: _isRepeatAuth = true,
      timeout = 20000,
      ...otherConfig
    } = objConfig || {};

    const { filePath, ...otherParams } = file || {};

    // 获取 token
    const storage = await CacheManager.getSyncStorage(['token']);
    const token = storage?.token || null;

    // upload 不支持 body，使用 formData
    const { urlAndQuery, t, k, requestid } = await getApiHeaders({
      path: url,
      query,
      body: {},
      token,
    });

    console.log('verifyLegal', {
      requestid,
      t,
      url,
      platform: env,
      secretKey,
      brand,
      queryReq: JSON.stringify(query),
      bodyReq: JSON.stringify(body),
    });

    const fullUrl = urlAndQuery.includes('://')
      ? urlAndQuery
      : `${this.baseUrl}${urlAndQuery}`;

    const headers: Record<string, string> = {
      platform: env,
      brand: brand,
      authorization: token ? `Bearer ${token}` : '',
      requestid,
      t,
      k,
      ...header,
    };

    // 创建 FormData
    const formData = new FormData();

    // 添加文件
    if (filePath) {
      // 在浏览器扩展中，filePath 可能是 blob URL 或 File 对象
      // 需要根据实际情况处理
      try {
        const fileBlob = await fetch(filePath).then(r => r.blob());
        formData.append('file', fileBlob);
      } catch (error) {
        console.error('Failed to load file:', error);
      }
    }

    // 添加其他参数
    Object.keys(otherParams).forEach(key => {
      formData.append(key, String(otherParams[key]));
    });

    // 将 body 中的参数也添加到 formData
    Object.keys(body).forEach(key => {
      formData.append(key, String(body[key]));
    });

    const axiosConfig: AxiosRequestConfig = {
      method: method.toLowerCase() as any,
      url: fullUrl,
      headers: {
        ...headers,
        // 不要设置 Content-Type，让 axios 自动设置（包含 boundary）
      },
      data: formData,
      params: query,
      timeout,
      ...otherConfig,
    };

    try {
      if (isShowLoading) {
        showLoading();
      }

      const response: AxiosResponse =
        await this.axiosInstance.request(axiosConfig);

      result = {
        statusCode: response.status,
        data: response.data,
        headers: response.headers as Record<string, any>,
      };
    } catch (error: any) {
      const axiosError = error as AxiosError;
      result = {
        statusCode: axiosError.response?.status || 0,
        data: axiosError.response?.data || error,
        error: axiosError.message || 'Network error',
        headers: (axiosError.response?.headers as Record<string, any>) || {},
      };
    }

    if (isShowLoading) {
      hideLoading();
    }

    console.debug(
      'FetchManager upload',
      JSON.stringify(objConfig),
      JSON.stringify(result)
    );
    return result;
  }

  async stream(objConfig: RequestConfig): Promise<ApiResponse> {
    let result: ApiResponse = {};

    const {
      method = 'GET',
      url,
      header = {},
      query = {},
      body = {},
      isShowLoading = false,
      isShowToast = false,
      timeout = 20000,
      ...otherConfig
    } = objConfig || {};

    // 获取 token
    const storage = await CacheManager.getSyncStorage(['token']);
    const token = storage?.token || null;

    const { urlAndQuery, t, k, requestid } = await getApiHeaders({
      path: url,
      query,
      body,
      token,
    });

    const fullUrl = urlAndQuery.includes('://')
      ? urlAndQuery
      : `${this.baseUrl}${urlAndQuery}`;

    const headers: Record<string, string> = {
      platform: env,
      brand: brand,
      authorization: token ? `Bearer ${token}` : '',
      requestid,
      t,
      k,
      'Content-Type': 'application/json',
      ...header,
    };

    const axiosConfig: AxiosRequestConfig = {
      method: method.toLowerCase() as any,
      url: fullUrl,
      headers,
      params: method === 'GET' || method === 'HEAD' ? query : undefined,
      data: method !== 'GET' && method !== 'HEAD' ? body : undefined,
      timeout,
      responseType: 'blob', // 使用 blob 以支持流式数据
      ...otherConfig,
    };

    console.debug('FetchManager options', JSON.stringify(axiosConfig, null, 2));

    // stream 方法返回一个 Promise，但实际流式处理需要特殊处理
    try {
      if (isShowLoading) {
        showLoading();
      }

      const response: AxiosResponse<Blob> =
        await this.axiosInstance.request(axiosConfig);

      // 对于流式响应，返回 Blob 的流
      // 如果需要 ReadableStream，可以通过 blob.stream() 获取
      const blob = response.data;
      const stream = blob.stream();

      result = {
        statusCode: response.status,
        data: stream,
        headers: response.headers as Record<string, any>,
      };

      if (isShowLoading) {
        hideLoading();
      }
    } catch (error: any) {
      const axiosError = error as AxiosError;
      const errorData = axiosError.response?.data as any;
      result = {
        statusCode: axiosError.response?.status || 0,
        data: axiosError.response?.data || error,
        error: axiosError.message || 'Network error',
        headers: (axiosError.response?.headers as Record<string, any>) || {},
      };
      if (isShowLoading) {
        hideLoading();
      }
      if (isShowToast) {
        showToast(errorData?.message || axiosError.message || 'Network error');
      }
    }

    console.debug('FetchManager stream', result);
    return result;
  }
}

export default FetchManager.getInstance();

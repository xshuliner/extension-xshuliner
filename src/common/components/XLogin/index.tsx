import logo from '@/src/assets/icon_128x128.png';
import Api from '@/src/common/api';
import { XButton } from '@/src/common/components/XButton';
import MemberManager from '@/src/common/kits/MemberManager';
import {
  Eye,
  EyeOff,
  Lock,
  MessageCircle,
  RefreshCw,
  User,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type LoginMode = 'qrCode' | 'password';

export function XLogin(): React.ReactNode {
  const navigate = useNavigate();
  const [loginMode, setLoginMode] = useState<LoginMode>('password');
  // qrCode
  const [loading, setLoading] = useState<boolean>(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isExpired, setExpired] = useState<boolean>(false);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );
  // password
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // 停止轮询
  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  // 查询登录状态
  const queryLoginStatus = async (uuid: string) => {
    try {
      const res = await Api.Xshuliner.getQueryMiniCodeLogin({ uuid });
      const { timer, token } = res?.data?.body || {};

      // 二维码过期
      if (!timer) {
        setExpired(true);
        stopPolling();
        return;
      }

      // 登录成功
      if (token) {
        stopPolling();
        await MemberManager.setToken(token);
        const resMemberInfo = await Api.Xshuliner.getQueryMemberInfo();
        if (!resMemberInfo?.data?.body?.memberInfo) {
          setExpired(true);
          stopPolling();
          toast.error('登录失败，请重新登录');
          return;
        }
        await MemberManager.setToken(token);
        MemberManager.setMemberInfo(resMemberInfo?.data?.body?.memberInfo);
        toast.success('登录成功');
        navigate('/');
        return;
      }
    } catch (error) {
      console.error('XLogin query status error', error);
    }
  };

  // 开始轮询
  const startPolling = (uuid: string) => {
    // 先停止之前的轮询
    stopPolling();
    // 重置过期状态
    setExpired(false);

    // 立即查询一次
    queryLoginStatus(uuid);

    // 每2秒轮询一次
    pollingIntervalRef.current = setInterval(() => {
      queryLoginStatus(uuid);
    }, 2000);
  };

  const initQrCode = async () => {
    try {
      setLoading(true);
      setExpired(false);
      const resLogin = await Api.Xshuliner.postCreateMiniCodeLogin();

      const { data, uuid } = resLogin?.data?.body || {};
      console.log('XLogin init', data, 'uuid:', uuid);

      // 开始轮询
      if (uuid) {
        startPolling(uuid);
      }

      // 处理返回的 Buffer 数据
      if (Array.isArray(data?.data)) {
        console.log('XLogin init data', data?.data);
        // 将 Buffer 数组转换为 Uint8Array
        const uint8Array = new Uint8Array(data?.data);
        // 转换为 Blob
        const blob = new Blob([uint8Array], { type: 'image/jpeg' });
        // 将 Blob 转换为 base64 data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setQrCodeUrl(base64String);
        };
        reader.readAsDataURL(blob);
      }
    } catch (error) {
      console.error('XLogin init error', error);
      stopPolling();
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    stopPolling();
    initQrCode();
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }

    try {
      setLoginLoading(true);
      const res = await Api.Xshuliner.postLoginMemberInfoForPassword({
        username,
        password,
      });
      console.log('Password login', res);
      if (res?.data?.code !== 200) {
        console.error('Password login error', res?.data?.message);
        toast.error('登录失败，请检查用户名和密码');
        return;
      }
      const { memberInfo, token, refreshToken } = res?.data?.body || {};
      await MemberManager.setToken({ token, refreshToken });
      MemberManager.setMemberInfo(memberInfo);
      console.log('Password login success', memberInfo, token);
      toast.success('登录成功');
      navigate('/');
    } catch (error) {
      console.error('Password login error', error);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleTermsOfServiceClick = () => {
    navigate('/terms-of-service');
  };

  const handlePrivacyPolicyClick = () => {
    navigate('/privacy-policy');
  };

  useEffect(() => {
    if (loginMode === 'qrCode') {
      initQrCode();
    }

    // 清理函数：组件卸载或切换模式时停止轮询
    return () => {
      stopPolling();
    };
  }, [loginMode]);

  return (
    <div className='relative flex h-160 w-86 flex-col items-center justify-center overflow-hidden px-4'>
      <div className='relative w-full max-w-md'>
        {/* 顶部欢迎区域 */}
        <div className='mb-6 flex flex-col items-center gap-2'>
          <div className='flex size-12 items-center justify-center overflow-hidden rounded-xl bg-card/20 backdrop-blur-md'>
            <img
              src={logo}
              alt='logo'
              className='h-full w-full object-contain'
            />
          </div>
          <h1 className='text-2xl font-semibold text-foreground'>欢迎回来</h1>
          <p className='text-sm text-muted-foreground'>选择您的登录方式</p>
        </div>

        {/* 毛玻璃卡片 */}
        <div className='rounded-3xl bg-white/20 shadow-2xl ring-1 ring-border/30 backdrop-blur-xl'>
          {/* 卡片头部 - 登录模式切换 */}
          <div className='border-b border-border/20 p-4'>
            <div className='flex gap-2'>
              <XButton
                type='button'
                variant='ghost'
                onClick={() => setLoginMode('password')}
                className={`flex-1 rounded-xl px-4 py-5 ${
                  loginMode === 'password'
                    ? 'bg-card/30 text-foreground shadow-lg backdrop-blur-sm hover:bg-card/30'
                    : 'bg-transparent text-muted-foreground hover:bg-card/10'
                }`}
              >
                <User className='size-4' />
                账号登录
              </XButton>
              <XButton
                type='button'
                variant='ghost'
                onClick={() => setLoginMode('qrCode')}
                className={`flex-1 rounded-xl px-4 py-5 ${
                  loginMode === 'qrCode'
                    ? 'bg-card/30 text-foreground shadow-lg backdrop-blur-sm hover:bg-card/30'
                    : 'bg-transparent text-muted-foreground hover:bg-card/10'
                }`}
              >
                <MessageCircle className='size-4' />
                微信登录
              </XButton>
            </div>
          </div>

          {/* 卡片内容 */}
          <div className='px-6 pt-3 pb-6'>
            {loginMode === 'qrCode' ? (
              <div className='flex h-84 flex-col items-center gap-6'>
                {!loading ? (
                  <>
                    <div className='relative rounded-2xl border-2 border-border/30 bg-card/10 p-4 shadow-lg backdrop-blur-sm'>
                      <img
                        src={qrCodeUrl}
                        alt='微信小程序太阳码'
                        className={`h-64 w-64 object-contain ${
                          isExpired ? 'blur-sm' : ''
                        }`}
                      />
                      {isExpired && (
                        <div className='absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/40 backdrop-blur-md'>
                          <XButton
                            variant='outline'
                            size='default'
                            onClick={handleRefresh}
                            disabled={loading}
                            className='gap-2 border-border/30 bg-card/20 text-foreground backdrop-blur-sm hover:bg-card/30'
                          >
                            <RefreshCw
                              className={loading ? 'animate-spin' : ''}
                            />
                            {loading ? '更新中...' : '刷新二维码'}
                          </XButton>
                        </div>
                      )}
                    </div>

                    <p className='text-sm text-muted-foreground'>
                      请使用微信扫描上方二维码登录
                    </p>
                  </>
                ) : (
                  <div className='flex flex-col items-center gap-3 py-12'>
                    <div className='size-8 animate-spin rounded-full border-4 border-border/20 border-t-foreground' />
                    <div className='text-sm text-muted-foreground'>
                      加载中...
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form
                onSubmit={handlePasswordLogin}
                className='flex h-84 flex-col gap-5'
              >
                {/* 用户名输入框 */}
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='username'
                    className='text-sm font-medium text-foreground'
                  >
                    用户名
                  </label>
                  <div className='relative'>
                    <div className='absolute top-1/2 left-4 -translate-y-1/2'>
                      <User className='size-5 text-muted-foreground' />
                    </div>
                    <input
                      id='username'
                      type='text'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder='请输入用户名'
                      className='w-full rounded-xl border border-input bg-card/10 px-4 py-3 pl-12 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:bg-card/15 focus:ring-2 focus:ring-ring/20 focus:outline-none'
                      required
                    />
                  </div>
                </div>

                {/* 密码输入框 */}
                <div className='flex flex-col gap-2'>
                  <label
                    htmlFor='password'
                    className='text-sm font-medium text-foreground'
                  >
                    密码
                  </label>
                  <div className='relative'>
                    <div className='absolute top-1/2 left-4 -translate-y-1/2'>
                      <Lock className='size-5 text-muted-foreground' />
                    </div>
                    <input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder='请输入密码'
                      className='w-full rounded-xl border border-input bg-card/10 px-4 py-3 pr-12 pl-12 text-sm text-foreground backdrop-blur-sm transition-all placeholder:text-muted-foreground/50 focus:border-ring focus:bg-card/15 focus:ring-2 focus:ring-ring/20 focus:outline-none'
                      required
                    />
                    <XButton
                      type='button'
                      variant='ghost'
                      size='icon'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                    >
                      {showPassword ? (
                        <Eye className='size-5' />
                      ) : (
                        <EyeOff className='size-5' />
                      )}
                    </XButton>
                  </div>
                </div>

                {/* 记住我和忘记密码 */}
                {/* <div className='flex items-center justify-between'>
                  <label className='flex cursor-pointer items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className='size-4 rounded border-input bg-card/10 text-primary focus:ring-2 focus:ring-ring/20'
                    />
                    <span className='text-sm text-muted-foreground'>
                      记住我
                    </span>
                  </label>
                  <XButton
                    type='button'
                    variant='link'
                    size='sm'
                    className='text-sm text-muted-foreground hover:text-foreground'
                  >
                    忘记密码?
                  </XButton>
                </div> */}

                {/* 占位 */}
                <div className='h-8' />

                {/* 登录按钮 */}
                <XButton
                  type='submit'
                  variant='primary'
                  size='lg'
                  disabled={loginLoading || !username || !password}
                  className='mt-2 w-full'
                >
                  {loginLoading ? (
                    <>
                      <RefreshCw className='animate-spin' />
                      登录中...
                    </>
                  ) : (
                    '登录'
                  )}
                </XButton>

                {/* 分隔线 */}
                {/* <div className='relative my-4'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-border/20' />
                  </div>
                  <div className='relative flex justify-center text-xs'>
                    <span className='bg-transparent px-2 text-muted-foreground'>
                      或
                    </span>
                  </div>
                </div> */}

                {/* Apple ID 登录 */}
                {/* <XButton
                  type='button'
                  variant='outline'
                  size='default'
                  className='w-full border-border/30 bg-card/10 text-foreground backdrop-blur-sm hover:bg-card/20'
                >
                  <Apple className='size-5' />
                  使用 Apple ID 登录
                </XButton> */}

                {/* 注册链接 */}
                {/* <div className='mt-4 text-center'>
                  <span className='text-sm text-muted-foreground'>
                    没有账号?
                  </span>
                  <XButton
                    type='button'
                    variant='link'
                    size='sm'
                    className='ml-1 text-sm font-medium text-foreground hover:text-muted-foreground'
                  >
                    立即注册
                  </XButton>
                </div> */}
              </form>
            )}
          </div>
        </div>

        {/* 底部服务条款 */}
        <div className='mt-6 text-center'>
          <p className='text-xs text-muted-foreground'>
            继续即表示您同意我们的
            <XButton
              type='button'
              variant='link'
              size='text-xs'
              onClick={handleTermsOfServiceClick}
              className='text-muted-foreground underline hover:text-foreground'
            >
              服务条款
            </XButton>
            和
            <XButton
              type='button'
              variant='link'
              size='text-xs'
              onClick={handlePrivacyPolicyClick}
              className='text-muted-foreground underline hover:text-foreground'
            >
              隐私政策
            </XButton>
          </p>
        </div>
      </div>
    </div>
  );
}

export default XLogin;

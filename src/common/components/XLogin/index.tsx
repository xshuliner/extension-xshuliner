import Api from '@/src/common/api';
import { useEffect, useState } from 'react';

const XLogin = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const init = async () => {
    try {
      const resLogin = await Api.Xshuliner.login();
      const res = resLogin?.data?.body;
      console.log('XLogin init', res);

      // 处理返回的 Buffer 数据
      if (Array.isArray(res?.data?.data)) {
        console.log('XLogin init data', res?.data?.data);
        // 将 Buffer 数组转换为 Uint8Array
        const uint8Array = new Uint8Array(res?.data?.data);
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
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden'>
      {qrCodeUrl ? (
        <img
          src={qrCodeUrl}
          alt='微信小程序太阳码'
          className='h-64 w-64 object-contain'
        />
      ) : (
        <div className='text-gray-500'>加载中...</div>
      )}
    </div>
  );
};

export default XLogin;

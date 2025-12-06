import Api from '@/src/common/api';
import { XButton } from '@/src/common/components/XButton';
import { useEffect, useState } from 'react';

const XLogin = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const init = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    init();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden'>
      <div className='flex flex-col items-center gap-6'>
        {qrCodeUrl ? (
          <>
            <img
              src={qrCodeUrl}
              alt='微信小程序太阳码'
              className='h-64 w-64 object-contain'
            />
            <XButton
              variant='outline'
              size='default'
              onClick={handleRefresh}
              disabled={loading}
              className='gap-2'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className={loading ? 'animate-spin' : ''}
              >
                <path d='M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' />
                <path d='M21 3v5h-5' />
              </svg>
              {loading ? '更新中...' : '更新登录码'}
            </XButton>
          </>
        ) : (
          <div className='flex flex-col items-center gap-3'>
            <div className='text-gray-500'>加载中...</div>
            <div className='size-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500' />
          </div>
        )}
      </div>
    </div>
  );
};

export default XLogin;

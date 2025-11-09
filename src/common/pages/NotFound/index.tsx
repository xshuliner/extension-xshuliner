import XNavHeader from '@/src/common/components/XNavHeader';
import XPageCore from '@/src/common/components/XPageCore';
import type React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound(): React.ReactNode {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(-1);
  };

  const handleReportBug = () => {};

  // 模拟像素风格的小机器人头部
  const PixelRobotHead = () => (
    <div className='relative mb-8 h-24 w-24 transform transition duration-300 hover:scale-105 sm:h-32 sm:w-32'>
      {/* 头部外框 (Body) - 深色调 */}
      <div className='absolute inset-0 h-full w-full rounded-lg border-4 border-gray-900 bg-gray-700 shadow-[8px_8px_0_0_#1f2937]'></div>

      {/* 屏幕/面罩 - 浅色调 */}
      <div className='absolute top-4 right-4 bottom-4 left-4 rounded-md border-2 border-gray-900 bg-gray-500'>
        {/* 眼睛 (Eyes) - 故障效果 */}
        <div className='absolute top-3 left-3 h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]'></div>
        <div className='absolute top-3 right-3 h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-[0_0_4px_#ef4444]'></div>

        {/* 嘴部/传感器 - 绿色指示灯 */}
        <div className='absolute bottom-3 left-1/2 h-2 w-8 -translate-x-1/2 transform border border-gray-900 bg-green-400'></div>
      </div>

      {/* 天线/装饰 - 方块天线 */}
      <div className='absolute -top-6 left-1/2 h-6 w-4 -translate-x-1/2 transform border-4 border-gray-900 bg-yellow-400 shadow-[4px_4px_0_0_#b58400]'></div>
      <div className='absolute -top-10 left-1/2 h-4 w-2 -translate-x-1/2 transform bg-red-600'></div>
    </div>
  );

  return (
    <XPageCore
      customClassNameChildren='px-2'
      renderPageHeader={() => {
        return <XNavHeader>NotFound</XNavHeader>;
      }}
    >
      <div className='flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 font-mono'>
        {/* 模拟游戏机边框的容器 */}
        <div className='w-full max-w-xl rounded-xl border-8 border-yellow-400 bg-gray-800 p-8 shadow-[20px_20px_0_0_#b58400] transition-all duration-500 ease-in-out sm:p-12'>
          {/* 像素角色 */}
          <div className='flex justify-center'>
            <PixelRobotHead />
          </div>

          {/* 404 故障信息 */}
          <div className='mb-8 text-center text-white'>
            {/* 大号像素数字 */}
            <h1
              className='mb-4 text-8xl font-extrabold tracking-widest text-red-500 sm:text-9xl'
              style={{ textShadow: '6px 6px 0 #1f2937, -6px -6px 0 #3b82f6' }}
            >
              404
            </h1>

            {/* 故障信息屏幕 */}
            <div className='my-6 border-4 border-gray-900 bg-red-900 p-4 shadow-inner'>
              <p className='animate-ping-slow text-2xl font-bold text-yellow-400 uppercase sm:text-3xl'>
                信号丢失... 找不到页面
              </p>
              <p className='mt-2 text-sm text-gray-300'>
                [错误代码：FILE_NOT_FOUND_0x404]
              </p>
            </div>

            <p className='mt-6 text-lg text-gray-300'>
              小机器人迷路了，请帮它找到回家的路。
            </p>
          </div>

          {/* 动作按钮组 */}
          <div className='flex flex-col justify-center gap-4 sm:flex-row'>
            {/* 返回主页按钮 */}
            <button
              onClick={handleGoHome}
              className='rounded-md border-b-4 border-green-800 bg-green-600 px-6 py-3 text-lg font-bold text-white uppercase shadow-[4px_4px_0_0_#16a34a] transition duration-150 hover:bg-green-500 active:translate-y-1 active:border-b-0' // 像素阴影效果
            >
              返回安全区 (Home)
            </button>

            {/* 报告故障按钮 */}
            <button
              onClick={handleReportBug}
              className='rounded-md border-b-4 border-gray-700 bg-gray-600 px-6 py-3 text-lg font-bold text-gray-300 uppercase shadow-[4px_4px_0_0_#4b5563] transition duration-150 hover:bg-gray-500 active:translate-y-1 active:border-b-0' // 像素阴影效果
            >
              报告故障
            </button>
          </div>
        </div>
      </div>
    </XPageCore>
  );
}

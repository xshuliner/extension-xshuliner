import {
  ArrowRight,
  Github,
  Globe,
  Lock,
  Moon,
  ScanLine,
  Smartphone,
  Sun,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const XLogin = () => {
  const [loginMethod, setLoginMethod] = useState('account'); // 'account' or 'wechat'
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [animateBg, setAnimateBg] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 简单的背景动画触发
  useEffect(() => {
    setAnimateBg(true);
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('登录逻辑已触发');
    }, 1500);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden font-sans transition-colors duration-700 ${isDark ? 'bg-black text-white selection:bg-blue-500 selection:text-white' : 'bg-[#F5F5F7] text-slate-900 selection:bg-blue-500 selection:text-white'}`}
    >
      {/* --- 主题切换按钮 (右上角) --- */}
      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-slate-900 shadow-md hover:bg-gray-50'}`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* --- 动态背景层 --- */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${animateBg ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* 顶部蓝色光晕 - 亮色模式下调整混合模式和透明度 */}
        <div
          className={`animate-pulse-slow absolute -top-[20%] left-[20%] h-[500px] w-[500px] rounded-full blur-[120px] transition-colors duration-700 ${isDark ? 'bg-blue-600/20 mix-blend-screen' : 'bg-blue-400/30 mix-blend-multiply'}`}
        />

        {/* 底部紫色光晕 */}
        <div
          className={`animate-pulse-slower absolute right-[20%] -bottom-[20%] h-[600px] w-[600px] rounded-full blur-[130px] transition-colors duration-700 ${isDark ? 'bg-purple-600/20 mix-blend-screen' : 'bg-purple-400/30 mix-blend-multiply'}`}
        />

        {/* 中间青色强调 */}
        <div
          className={`absolute top-[40%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 rounded-full blur-[100px] transition-colors duration-700 ${isDark ? 'bg-cyan-500/10 mix-blend-screen' : 'bg-cyan-400/20 mix-blend-multiply'}`}
        />

        {/* 网格纹理叠加 - 亮色模式下减弱 */}
        <div
          className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] transition-opacity duration-700 ${isDark ? 'opacity-20 brightness-100 contrast-150' : 'opacity-10 mix-blend-soft-light brightness-100 contrast-100'}`}
        ></div>
      </div>

      {/* --- 主容器 --- */}
      <div className='relative z-10 w-full max-w-[420px] px-4'>
        {/* 玻璃拟态卡片 - 核心样式切换 */}
        <div
          className={`group relative overflow-hidden rounded-[32px] p-8 backdrop-blur-2xl transition-all duration-500 ${
            isDark
              ? 'border border-white/10 bg-white/5 shadow-2xl ring-1 ring-white/5 hover:bg-white/[0.07] hover:shadow-blue-500/10'
              : 'border border-white/60 bg-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 hover:bg-white/80'
          }`}
        >
          {/* 顶部 Logo / 标题 */}
          <div className='mb-8 text-center'>
            <div
              className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr shadow-lg transition-all duration-500 ${isDark ? 'from-blue-500 to-purple-600 shadow-blue-500/30' : 'from-blue-500 to-purple-500 shadow-blue-500/20'}`}
            >
              <Globe className='h-6 w-6 text-white' />
            </div>
            <h1
              className={`text-2xl font-medium tracking-tight transition-colors duration-500 ${isDark ? 'text-white/90' : 'text-slate-900'}`}
            >
              欢迎回来
            </h1>
            <p
              className={`mt-2 text-sm transition-colors duration-500 ${isDark ? 'text-white/50' : 'text-slate-500'}`}
            >
              请选择您的登录方式以继续
            </p>
          </div>

          {/* 切换 Tab */}
          <div
            className={`mb-8 grid grid-cols-2 gap-1 rounded-xl p-1 backdrop-blur-md transition-colors duration-500 ${isDark ? 'bg-black/20' : 'bg-slate-200/50'}`}
          >
            <button
              onClick={() => setLoginMethod('account')}
              className={`relative flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 ${
                loginMethod === 'account'
                  ? isDark
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'bg-white text-slate-900 shadow-sm'
                  : isDark
                    ? 'text-white/40 hover:text-white/70'
                    : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              账号密码
            </button>
            <button
              onClick={() => setLoginMethod('wechat')}
              className={`relative flex h-9 items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 ${
                loginMethod === 'wechat'
                  ? 'bg-[#07C160]/10 text-[#07C160] shadow-sm'
                  : isDark
                    ? 'text-white/40 hover:text-white/70'
                    : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              微信扫码
            </button>
          </div>

          {/* 内容区域 */}
          <div className='relative min-h-[300px]'>
            {/* --- 账号密码登录表单 --- */}
            <div
              className={`absolute inset-0 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                loginMethod === 'account'
                  ? 'pointer-events-auto translate-x-0 opacity-100'
                  : 'pointer-events-none -translate-x-10 opacity-0'
              }`}
            >
              <form onSubmit={handleLogin} className='flex flex-col gap-5'>
                <div className='group/input relative'>
                  <div
                    className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transition-colors ${isDark ? 'text-white/30 group-focus-within/input:text-blue-400' : 'text-slate-400 group-focus-within/input:text-blue-500'}`}
                  >
                    <User size={18} />
                  </div>
                  <input
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder='请输入用户名 / 邮箱'
                    className={`h-12 w-full rounded-xl border pr-4 pl-11 text-sm transition-all outline-none ${
                      isDark
                        ? 'border-white/10 bg-black/20 text-white placeholder-white/20 focus:border-blue-500/50 focus:bg-black/40'
                        : 'border-transparent bg-white/50 text-slate-900 placeholder-slate-400 hover:bg-white/80 focus:border-blue-500/20 focus:bg-white focus:ring-2 focus:ring-blue-500/10'
                    }`}
                  />
                </div>

                <div className='group/input relative'>
                  <div
                    className={`pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 transition-colors ${isDark ? 'text-white/30 group-focus-within/input:text-blue-400' : 'text-slate-400 group-focus-within/input:text-blue-500'}`}
                  >
                    <Lock size={18} />
                  </div>
                  <input
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='请输入密码'
                    className={`h-12 w-full rounded-xl border pr-4 pl-11 text-sm transition-all outline-none ${
                      isDark
                        ? 'border-white/10 bg-black/20 text-white placeholder-white/20 focus:border-blue-500/50 focus:bg-black/40'
                        : 'border-transparent bg-white/50 text-slate-900 placeholder-slate-400 hover:bg-white/80 focus:border-blue-500/20 focus:bg-white focus:ring-2 focus:ring-blue-500/10'
                    }`}
                  />
                </div>

                <div className='flex items-center justify-between text-xs'>
                  <label className='group/check flex cursor-pointer items-center gap-2'>
                    <input type='checkbox' className='peer sr-only' />
                    <div
                      className={`h-3.5 w-3.5 rounded border transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500 ${isDark ? 'border-white/20 bg-transparent' : 'border-slate-300 bg-white'}`}
                    />
                    <span
                      className={`transition-colors ${isDark ? 'text-white/40 group-hover/check:text-white/60' : 'text-slate-500 group-hover/check:text-slate-700'}`}
                    >
                      记住我
                    </span>
                  </label>
                  <a
                    href='#'
                    className='text-blue-500 transition-colors hover:text-blue-400 hover:underline'
                  >
                    忘记密码?
                  </a>
                </div>

                <button
                  type='submit'
                  disabled={isLoading}
                  className={`group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 ${isDark ? 'bg-white text-black' : 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'}`}
                >
                  {isLoading ? (
                    <div
                      className={`h-5 w-5 animate-spin rounded-full border-2 border-t-transparent ${isDark ? 'border-black' : 'border-white'}`}
                    />
                  ) : (
                    <>
                      <span>立即登录</span>
                      <ArrowRight
                        size={16}
                        className='transition-transform group-hover:translate-x-1'
                      />
                    </>
                  )}
                </button>
              </form>

              <div className='mt-auto pt-6'>
                <div className='relative flex items-center gap-4 py-4'>
                  <div
                    className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${isDark ? 'to-white/10' : 'to-slate-200'}`}
                  ></div>
                  <span
                    className={`text-xs tracking-wider uppercase ${isDark ? 'text-white/30' : 'text-slate-400'}`}
                  >
                    第三方登录
                  </span>
                  <div
                    className={`h-[1px] flex-1 bg-gradient-to-l from-transparent ${isDark ? 'to-white/10' : 'to-slate-200'}`}
                  ></div>
                </div>
                <div className='flex justify-center gap-4'>
                  <button
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:scale-110 hover:border-transparent hover:bg-white hover:text-black ${isDark ? 'border-white/10 bg-white/5 text-white/60' : 'border-slate-200 bg-white text-slate-500 hover:shadow-md'}`}
                  >
                    <Github size={18} />
                  </button>
                  <button
                    className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all hover:scale-110 hover:border-transparent hover:bg-[#0077B5] hover:text-white ${isDark ? 'border-white/10 bg-white/5 text-white/60' : 'border-slate-200 bg-white text-slate-500 hover:shadow-md'}`}
                  >
                    <div className='text-sm font-bold'>in</div>
                  </button>
                </div>
              </div>
            </div>

            {/* --- 微信扫码登录区域 --- */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                loginMethod === 'wechat'
                  ? 'pointer-events-auto translate-x-0 opacity-100'
                  : 'pointer-events-none translate-x-10 opacity-0'
              }`}
            >
              <div className='group/qr relative cursor-pointer'>
                {/* 装饰角标 */}
                <div className='absolute -top-1 -left-1 h-6 w-6 border-t-2 border-l-2 border-[#07C160]/50 transition-all group-hover/qr:w-full group-hover/qr:border-[#07C160]' />
                <div className='absolute -top-1 -right-1 h-6 w-6 border-t-2 border-r-2 border-[#07C160]/50 transition-all group-hover/qr:h-full group-hover/qr:border-[#07C160]' />
                <div className='absolute -bottom-1 -left-1 h-6 w-6 border-b-2 border-l-2 border-[#07C160]/50 transition-all group-hover/qr:h-full group-hover/qr:border-[#07C160]' />
                <div className='absolute -right-1 -bottom-1 h-6 w-6 border-r-2 border-b-2 border-[#07C160]/50 transition-all group-hover/qr:w-full group-hover/qr:border-[#07C160]' />

                {/* 二维码容器 */}
                <div
                  className={`relative h-48 w-48 overflow-hidden rounded-xl p-2 shadow-lg transition-colors ${isDark ? 'bg-white shadow-[#07C160]/10' : 'bg-white shadow-slate-200'}`}
                >
                  <img
                    src='https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChatLoginHighEndDesign'
                    alt='WeChat QR'
                    className='h-full w-full object-contain opacity-90'
                  />
                  <div className='animate-scan absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#07C160] to-transparent opacity-50 shadow-[0_0_15px_rgba(7,193,96,0.5)]' />

                  <div className='absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 backdrop-blur-sm transition-opacity group-hover/qr:opacity-100'>
                    <div className='flex flex-col items-center gap-2 text-[#07C160]'>
                      <ScanLine size={32} />
                      <span className='text-sm font-medium'>
                        点击刷新二维码
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-8 text-center'>
                <p
                  className={`flex items-center justify-center gap-2 text-sm ${isDark ? 'text-white/80' : 'text-slate-600'}`}
                >
                  <Smartphone size={16} className='text-[#07C160]' />
                  请使用{' '}
                  <span className='font-medium text-[#07C160]'>微信</span>{' '}
                  扫一扫登录
                </p>
                <p
                  className={`mt-2 text-xs ${isDark ? 'text-white/30' : 'text-slate-400'}`}
                >
                  二维码有效期 60 秒，过期后请刷新
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权/链接 */}
        <div
          className={`mt-8 flex justify-center gap-6 text-xs transition-colors ${isDark ? 'text-white/20' : 'text-slate-400'}`}
        >
          <a
            href='#'
            className={`transition-colors ${isDark ? 'hover:text-white/50' : 'hover:text-slate-600'}`}
          >
            注册账户
          </a>
          <span>|</span>
          <a
            href='#'
            className={`transition-colors ${isDark ? 'hover:text-white/50' : 'hover:text-slate-600'}`}
          >
            隐私政策
          </a>
          <span>|</span>
          <a
            href='#'
            className={`transition-colors ${isDark ? 'hover:text-white/50' : 'hover:text-slate-600'}`}
          >
            服务条款
          </a>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
        .animate-scan {
            animation: scan 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default XLogin;

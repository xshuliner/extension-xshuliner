import { XButton } from '@/src/common/components/XButton';
import MemberManager from '@/src/common/kits/MemberManager';
import type { IMemberInfoType } from '@/src/common/types';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Clock3,
  Crown,
  Link2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  UserRound,
} from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

type InfoItemProps = {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
};

const InfoItem = ({ icon: Icon, label, value }: InfoItemProps) => {
  const displayValue =
    value === undefined || value === null || value === '' ? '未设置' : value;

  return (
    <div className='flex items-center justify-between gap-3 border-b border-border/60 py-2.5 last:border-b-0'>
      <div className='flex items-center gap-3 text-sm text-foreground'>
        <Icon className='size-4 text-muted-foreground' />
        <span>{label}</span>
      </div>
      <div className='text-sm text-muted-foreground'>{displayValue}</div>
    </div>
  );
};

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

export function XPageMine() {
  const initialMemberInfo = MemberManager.getMemberInfo();
  const [memberInfo, setMemberInfo] = useState<IMemberInfoType | null>(
    initialMemberInfo
  );
  const [_loading, setLoading] = useState<boolean>(!initialMemberInfo);

  useEffect(() => {
    if (memberInfo) return;

    let isMounted = true;
    const fetchMemberInfo = async () => {
      try {
        setLoading(true);
        const info = await MemberManager.queryMemberInfo();
        if (isMounted) {
          setMemberInfo(info);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMemberInfo();

    return () => {
      isMounted = false;
    };
  }, [memberInfo]);

  const location =
    [memberInfo?.user_province, memberInfo?.user_city, memberInfo?.user_area]
      .filter(Boolean)
      .join(' · ') || '未设置';

  const childrenCount = Array.isArray(memberInfo?.sys_childrenId)
    ? memberInfo?.sys_childrenId.filter(Boolean).length
    : 0;

  const avatar =
    memberInfo?.user_avatarUrl ||
    'https://oss.xshuliner.online/SmartApp/Avatar/default_000000.jpg';

  const handleLogout = async () => {
    const confirmed = window.confirm('确定要退出登录吗？');
    if (!confirmed) return;
    await MemberManager.logout();
    window.location.reload();
  };

  return (
    <div className='flex flex-col gap-3 overflow-y-auto p-2 pb-24 text-sm text-foreground'>
      {/* 个人资料 */}
      <div className='relative flex-[0_0_auto] overflow-hidden rounded-2xl border border-border bg-linear-to-r from-emerald-500 to-cyan-500 text-white shadow-md'>
        <div className='absolute inset-0 bg-white/10' aria-hidden />
        <div className='relative flex items-center gap-3 p-4'>
          <img
            src={avatar}
            alt='用户头像'
            className='size-14 rounded-xl border border-white/20 bg-white/10 object-cover shadow-sm'
          />
          <div className='flex flex-1 flex-col'>
            <div className='flex items-center gap-2'>
              <div className='text-lg font-semibold'>
                {memberInfo?.user_nickName || '未登录'}
              </div>
              <span className='rounded-full bg-white/20 px-2 py-0.5 text-xs capitalize'>
                {memberInfo?.sys_status || '待激活'}
              </span>
            </div>
            <div className='mt-1 text-xs text-white/80'>
              ID: {memberInfo?.sys_thirdId || '—'}
            </div>
            <div className='mt-2 flex flex-wrap gap-2 text-[11px] text-white/80'>
              <span className='rounded-full bg-black/10 px-2 py-0.5'>
                {memberInfo?.sys_thirdPlatform || 'Platform'}
              </span>
              {/* <span className='rounded-full bg-black/10 px-2 py-0.5'>
                {memberInfo?.sys_thirdBrand || 'Brand'}
              </span> */}
              <span className='rounded-full bg-black/10 px-2 py-0.5'>
                {memberInfo?.user_title || '普通用户'}
              </span>
            </div>
          </div>
        </div>
        <div className='relative grid grid-cols-3 divide-x divide-white/15 border-t border-white/15 text-center text-xs'>
          <div className='p-3'>
            <div className='text-base font-semibold text-white'>
              {memberInfo?.sys_countLogin ?? 0}
            </div>
            <div className='text-white/80'>登录次数</div>
          </div>
          <div className='p-3'>
            <div className='text-base font-semibold text-white'>
              {memberInfo?.user_level ?? 0}
            </div>
            <div className='text-white/80'>等级</div>
          </div>
          <div className='p-3'>
            <div className='text-base font-semibold text-white'>
              {memberInfo?.user_score ?? 0}
            </div>
            <div className='text-white/80'>积分</div>
          </div>
        </div>
      </div>

      {/* 联系方式 */}
      <div className='relative flex-[0_0_auto] overflow-hidden rounded-2xl border border-border bg-card shadow-sm'>
        <div className='px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
          联系方式
        </div>
        <div className='px-4'>
          <InfoItem
            icon={Phone}
            label='手机号'
            value={memberInfo?.identity_phone || '未绑定'}
          />
          <InfoItem
            icon={Mail}
            label='邮箱'
            value={memberInfo?.identity_email || '未绑定'}
          />
          <InfoItem icon={MapPin} label='地区' value={location} />
        </div>
      </div>

      {/* 账号信息 */}
      <div className='relative flex-[0_0_auto] overflow-hidden rounded-2xl border border-border bg-card shadow-sm'>
        <div className='px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
          账号信息
        </div>
        <div className='px-4'>
          <InfoItem
            icon={UserRound}
            label='用户名'
            value={memberInfo?.identity_username || '未设置'}
          />
          <InfoItem
            icon={Crown}
            label='称号'
            value={memberInfo?.user_title || '普通用户'}
          />
          <InfoItem
            icon={Star}
            label='等级'
            value={`Lv.${memberInfo?.user_level ?? 0}`}
          />
          <InfoItem
            icon={Activity}
            label='积分'
            value={memberInfo?.user_score ?? 0}
          />
        </div>
      </div>

      {/* 安全与关系 */}
      <div className='relative flex-[0_0_auto] overflow-hidden rounded-2xl border border-border bg-card shadow-sm'>
        <div className='px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
          安全与关系
        </div>
        <div className='px-4'>
          {/* <InfoItem
            icon={ShieldCheck}
            label='账号状态'
            value={memberInfo?.sys_status || '—'}
          /> */}
          <InfoItem
            icon={Clock3}
            label='创建时间'
            value={formatDate(memberInfo?.sys_createTime)}
          />
          {/* <InfoItem
            icon={Clock3}
            label='最近更新'
            value={
              loading ? '加载中...' : formatDate(memberInfo?.sys_updateTime)
            }
          /> */}
          <InfoItem
            icon={Link2}
            label='上级ID'
            value={memberInfo?.sys_parentsId || '未关联'}
          />
          <InfoItem
            icon={ShieldCheck}
            label='下级数量'
            value={childrenCount ? `${childrenCount} 个` : '暂无下级'}
          />
        </div>
      </div>

      {/* 更多设置 */}
      <div className='relative flex-[0_0_auto] overflow-hidden rounded-2xl border border-border bg-card shadow-sm'>
        <div className='px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
          更多设置
        </div>
        <div className='px-4 pb-4'>
          <XButton
            type='button'
            variant='destructive'
            className='mt-1 w-full'
            onClick={handleLogout}
          >
            退出登录
          </XButton>
        </div>
      </div>
    </div>
  );
}

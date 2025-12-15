import { XAnimatedIcon } from '@/src/common/components/XAnimatedIcon';
import { XButton } from '@/src/common/components/XButton';
import classNames from 'classnames';
import {
  Bot,
  Compass,
  MessageCircleCode,
  UserRound,
  type LucideIcon,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

type TabType = 'home' | 'agent' | 'discover' | 'mine';

export interface ITabInfoType {
  id: TabType;
  Icon: LucideIcon;
  label: string;
  path: string;
}

export interface IXTabbarProps {
  defaultTab?: TabType;
  onTabbarClick: (tabbar: ITabInfoType) => void;
}

export function XTabbar(props: IXTabbarProps): React.ReactNode {
  const { defaultTab = 'home', onTabbarClick } = props || {};

  const [activeTab, setActiveTab] = useState<TabType>(defaultTab as TabType);
  const [tabs, _setTabs] = useState<ITabInfoType[]>([
    {
      id: 'home',
      Icon: MessageCircleCode,
      label: '会话',
      path: '/',
    },
    {
      id: 'agent',
      Icon: Bot,
      label: '工具',
      path: '/agent',
    },
    {
      id: 'discover',
      Icon: Compass,
      label: '发现',
      path: '/discover',
    },
    {
      id: 'mine',
      Icon: UserRound,
      label: '我的',
      path: '/mine',
    },
  ]);

  const handleTabClick = (tab: ITabInfoType) => {
    setActiveTab(tab.id);
    onTabbarClick(tab);
  };

  return (
    <div className='flex h-14 w-full flex-row items-center justify-between'>
      {tabs.map(tab => (
        <XButton
          key={tab.id}
          variant='muted'
          className={classNames(
            'flex h-full flex-1 flex-col items-center justify-center transition-colors duration-200',
            {
              'text-primary': activeTab === tab.id,
              'text-foreground': activeTab !== tab.id,
            }
          )}
          onClick={() => handleTabClick(tab)}
        >
          <XAnimatedIcon
            Icon={tab.Icon}
            isActive={activeTab === tab.id}
            className='size-6 transition-colors duration-200'
          />
          {tab.label && <div className='text-xs'>{tab.label}</div>}
        </XButton>
      ))}
    </div>
  );
}

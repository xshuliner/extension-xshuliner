import classNames from 'classnames';
import { type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export interface IXAnimatedIconProps {
  Icon: LucideIcon;
  isActive: boolean;
  className?: string;
  strokeWidth?: number;
  animationDuration?: number;
  delayBetweenPaths?: number;
}

/**
 * SVG 一笔画动画组件
 * 实现 SVG 线条的"一笔画"动画效果，模拟手写过程
 */
export function XAnimatedIcon({
  Icon,
  isActive,
  className = '',
  strokeWidth = 1.5,
  animationDuration = 0.8,
  delayBetweenPaths = 0.1,
}: IXAnimatedIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const svgElement = containerRef.current.querySelector(
      'svg'
    ) as SVGSVGElement;
    if (!svgElement) return;

    // 获取所有路径元素
    const paths = svgElement.querySelectorAll(
      'path, circle, line, polyline, polygon, rect'
    );

    if (isActive) {
      // 当图标变为激活状态时，触发动画
      setShouldAnimate(true);

      paths.forEach((path, index) => {
        const element = path as
          | SVGPathElement
          | SVGCircleElement
          | SVGLineElement
          | SVGPolylineElement
          | SVGPolygonElement
          | SVGRectElement;

        // 确保元素有 stroke 属性
        if (
          element.getAttribute('stroke') === 'none' ||
          !element.getAttribute('stroke')
        ) {
          element.setAttribute('stroke', 'currentColor');
        }

        // 获取路径长度
        let pathLength = 0;
        if (element instanceof SVGPathElement) {
          pathLength = element.getTotalLength();
        } else if (element instanceof SVGCircleElement) {
          const r = parseFloat(element.getAttribute('r') || '0');
          pathLength = 2 * Math.PI * r;
        } else if (element instanceof SVGLineElement) {
          const x1 = parseFloat(element.getAttribute('x1') || '0');
          const y1 = parseFloat(element.getAttribute('y1') || '0');
          const x2 = parseFloat(element.getAttribute('x2') || '0');
          const y2 = parseFloat(element.getAttribute('y2') || '0');
          pathLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        } else if (
          element instanceof SVGPolylineElement ||
          element instanceof SVGPolygonElement
        ) {
          const points = element.getAttribute('points')?.split(/[\s,]+/) || [];
          pathLength = 0;
          for (let i = 0; i < points.length - 2; i += 2) {
            const x1 = parseFloat(points[i]);
            const y1 = parseFloat(points[i + 1]);
            const x2 = parseFloat(points[i + 2] || points[0]);
            const y2 = parseFloat(points[i + 3] || points[1]);
            pathLength += Math.sqrt(
              Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
            );
          }
        } else if (element instanceof SVGRectElement) {
          const width = parseFloat(element.getAttribute('width') || '0');
          const height = parseFloat(element.getAttribute('height') || '0');
          pathLength = 2 * (width + height);
        }

        if (pathLength > 0) {
          // 先重置状态，确保动画可以重新播放
          element.style.transition = 'none';
          element.style.strokeDasharray = `${pathLength}`;
          element.style.strokeDashoffset = `${pathLength}`;
          element.style.strokeLinecap = 'round';
          element.style.strokeLinejoin = 'round';

          // 使用 requestAnimationFrame 确保重置完成后再触发动画
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              element.style.transition = `stroke-dashoffset ${animationDuration}s ease-in-out ${
                index * delayBetweenPaths
              }s`;
              element.style.strokeDashoffset = '0';
            });
          });
        }
      });
    } else {
      // 当图标变为非激活状态时，平滑重置
      paths.forEach(path => {
        const element = path as SVGElement;
        // 移除动画样式，保持当前状态
        element.style.transition = 'stroke-dashoffset 0.3s ease-out';
        element.style.strokeDasharray = 'none';
        element.style.strokeDashoffset = '0';
      });
      setShouldAnimate(false);
    }
  }, [isActive, animationDuration, delayBetweenPaths]);

  return (
    <div ref={containerRef} className='inline-flex items-center justify-center'>
      <Icon
        className={classNames(className, {
          'animate-draw': shouldAnimate,
          'text-primary': isActive,
          'text-foreground': !isActive,
        })}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}

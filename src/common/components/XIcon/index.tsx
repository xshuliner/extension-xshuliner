export interface XIconProps {
  name: string;
  width?: number;
  height?: number;
  color?: string;
  customClassName?: string;
}

export default function XIcon(props: XIconProps) {
  const {
    name,
    width = 16,
    height = 16,
    color = 'currentColor',
    customClassName = '',
  } = props || {};

  return (
    {
      home: (
        <svg
          viewBox='0 0 1024 1024'
          width={width}
          height={height}
          color={color}
          className={customClassName}
        >
          <path d='M310.272 581.632v239.616H716.8V581.632h69.632v311.296H237.568V581.632h72.704zM786.432 512L512 237.568 237.568 512H131.072L512 131.072 892.928 512H786.432zM403.456 674.816h218.112v79.872H403.456v-79.872z'></path>
        </svg>
      ),
    }[name] || <div>unknown icon</div>
  );
}

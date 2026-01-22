'use client';

import { Children, FC, ReactElement, ReactNode, useMemo } from 'react';
import Slick, { Settings } from 'react-slick';
import { cn } from '../utils';
import { Icon } from '../icons/Icon';

type Breakpoint = {
  breakpoint: number;
  settings: Settings;
};

interface SliderProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;

  // core options
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  dots?: boolean;
  arrows?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  speed?: number;
  rtl?: boolean;

  // extras
  centerMode?: boolean;
  variableWidth?: boolean;
  adaptiveHeight?: boolean;

  // responsive
  responsive?: Breakpoint[];

  // callbacks
  beforeChange?: Settings['beforeChange'];
  afterChange?: Settings['afterChange'];

  // custom arrows
  nextArrow?: ReactNode;
  prevArrow?: ReactNode;
}

const DefaultNextArrow: FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => (
  <button
    type='button'
    className={cn(
      'slick-arrow slick-next transition-300 z-10 right-2 rounded-full bg-black/50! hover:bg-black/70! text-primary! p-1',
      className,
    )}
    onClick={onClick}
    aria-label='Next'
  ></button>
);

const DefaultPrevArrow: FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => (
  <button
    type='button'
    className={cn(
      'slick-arrow slick-prev transition-300 z-10 left-2 rounded-full bg-black/50! hover:bg-black/70! text-primary! p-1',
      className,
    )}
    onClick={onClick}
    aria-label='Previous'
  ></button>
);

export const Slider: FC<SliderProps> = ({
  children,
  className,

  // defaults
  slidesToShow = 4,
  slidesToScroll = 1,
  infinite = true,
  dots = false,
  arrows = true,
  autoplay = false,
  autoplaySpeed = 3000,
  speed = 500,
  rtl = false,

  centerMode = false,
  variableWidth = false,
  adaptiveHeight = false,

  responsive,
  beforeChange,
  afterChange,
  nextArrow,
  prevArrow,
}) => {
  const computedResponsive = useMemo<Breakpoint[]>(
    () =>
      responsive ?? [
        {
          breakpoint: 1280, // >= md/lg
          settings: { slidesToShow: Math.min(slidesToShow, 3) },
        },
        {
          breakpoint: 1024, // md
          settings: { slidesToShow: Math.min(slidesToShow, 2) },
        },
        {
          breakpoint: 640, // sm
          settings: { slidesToShow: 1 },
        },
      ],
    [responsive, slidesToShow],
  );

  const settings: Settings = {
    dots,
    arrows,
    infinite,
    speed,
    slidesToShow,
    slidesToScroll,
    autoplay,
    autoplaySpeed,
    rtl,
    centerMode,
    variableWidth,
    adaptiveHeight,
    responsive: computedResponsive,
    beforeChange,
    afterChange,
    nextArrow: arrows ? (nextArrow ?? <DefaultNextArrow />) : undefined,
    prevArrow: arrows ? (prevArrow ?? <DefaultPrevArrow />) : undefined,
  };

  const slides = Children.toArray(children) as ReactElement[];

  return (
    <div className={cn('slider-container', className)}>
      <Slick {...settings}>{slides}</Slick>
    </div>
  );
};

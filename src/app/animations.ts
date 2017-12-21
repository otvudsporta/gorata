import { trigger, animate, style, group, query, transition } from '@angular/animations';

const transitionOptions = '0.4s cubic-bezier(0.25, 1, 0.25, 1)';
const optional = { optional: true };

const transparent = style({ opacity: 0 });
const opaque = style({ opacity: 1 });

const fadeIn = [transparent, animate(transitionOptions, opaque)];

const absolute = style({ position: 'absolute', width: '100%' });
const left = style({ transform: 'translateX(-100%)' });
const center = style({ transform: 'translateX(0%)' });
const right = style({ transform: 'translateX(100%)' });

const leaveToLeftEnterFromRight = [
  query(':enter, :leave', absolute, optional),
  group([
    query(':enter', [right, animate(transitionOptions, center)], optional),
    query(':leave', [center, animate(transitionOptions, left)], optional)
  ])
];

const leaveToRightEnterFromLeft = [
  query(':enter, :leave', absolute, optional),
  group([
    query(':enter', [left, animate(transitionOptions, center)], optional),
    query(':leave', [center, animate(transitionOptions, right)], optional)
  ])
];

// NOTE: We can't currently use this because of:
// https://github.com/angular/angular-cli/issues/4956
const createTransitions = ({ from, to, lt, eq, gt }: DynamicTransitionOptions) => {
  const transitions = [];
  for (let l = from; l <= to; l++) {
    for (let r = from; r <= to; r++) {
      const operator = l === r ? '<=>' : ' =>';
      const steps = l < r ? lt : l === r ? eq : gt;
      transitions.push([`${l} ${operator} ${r}`, steps]);
    }
  }
  return transitions;
};

interface DynamicTransitionOptions {
  from: number;
  to: number;
  lt: any[]; // TODO: Type
  eq: any[]; // TODO: Type
  gt: any[]; // TODO: Type
}

// TODO: Fix `x <=> x` transitions, as they're currently not being triggered
export const pageTransition = trigger('pageTransition', [
  transition('0 <=> 0', fadeIn),
  transition('0  => 1', leaveToLeftEnterFromRight),
  transition('0  => 2', leaveToLeftEnterFromRight),
  transition('0  => 3', leaveToLeftEnterFromRight),
  transition('1  => 0', leaveToRightEnterFromLeft),
  transition('1 <=> 1', fadeIn),
  transition('1  => 2', leaveToLeftEnterFromRight),
  transition('1  => 3', leaveToLeftEnterFromRight),
  transition('2  => 0', leaveToRightEnterFromLeft),
  transition('2  => 1', leaveToRightEnterFromLeft),
  transition('2 <=> 2', fadeIn),
  transition('2  => 3', leaveToLeftEnterFromRight),
  transition('3  => 0', leaveToRightEnterFromLeft),
  transition('3  => 1', leaveToRightEnterFromLeft),
  transition('3  => 2', leaveToRightEnterFromLeft),
  transition('3 <=> 3', fadeIn),
]);

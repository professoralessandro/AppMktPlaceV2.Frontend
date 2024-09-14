import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CommonService } from '../services/common.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective {

  @Input('appTooltip') tooltipTitle?: string = '';
  @Input() placement?: string;
  @Input() delay?: number;
  tooltip?: HTMLElement;
  offset = 10;

  constructor(
    private el: ElementRef,
    private commonService: CommonService
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.commonService.isNullOrUndefined(this.tooltip)) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.commonService.isNullOrUndefined(this.tooltip)) {
      this.hide();
      // this.tooltip = undefined;
    }
  }

  private show() {
    this.create();
    this.setPosition();
    this.tooltip?.classList.add('ng-tooltip-show');
  }

  private hide() {
    this.tooltip?.classList.remove('ng-tooltip-show');
    this.tooltip?.remove();
    this.tooltip = undefined;
    // window.setTimeout(() => {
    //   this.tooltip?.classList.remove('ng-tooltip-show');
    //   this.tooltip?.remove();
    //   this.tooltip = undefined;
    // }, this.delay);
  }

  private create() {
    this.tooltip = document.createElement('span');
    this.tooltip.classList.add('ng-tooltip');
    this.tooltip.textContent = this.tooltipTitle;
    document.body.appendChild(this.tooltip);
  }

  private setPosition() {
    const elemRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltip?.getBoundingClientRect();
    if (!tooltipRect) return;
    let left, top;
    switch (this.placement) {
      case 'top':
        top = elemRect.top - tooltipRect.height - this.offset;
        left = elemRect.left + (elemRect.width - tooltipRect.width) / 2;
        break;

      case 'bottom':
        top = elemRect.bottom + this.offset;
        left = elemRect.left + (elemRect.width - tooltipRect.width) / 2;
        break;

      case 'left':
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        left = elemRect.left - tooltipRect.width - this.offset;
        break;

      case 'right':
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        left = elemRect.right + this.offset;
        break;

      default:
        throw new Error('Invalid placement value: ' + this.placement);
    }

    if (!this.commonService.isNullOrUndefined(this.tooltip)) {
      this.tooltip.style.top = `${top}px`;
      this.tooltip.style.left = `${left}px`;
    }
  }
}

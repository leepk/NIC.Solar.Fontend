import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
    selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {

    @Input('header') header: any;
    @Input('component') component: any;
    @Input('main') main: any;
    private lastY = 0;
    @Input('isFirstLoad') isFirstLoad: boolean;
    constructor(
        private renderer: Renderer2,
        private domCtrl: DomController
    ) { }

    ngOnInit(): void {
        this.header = this.header.el;
        this.component = this.component.el;
        this.domCtrl.write(() => {
            //this.renderer.setStyle(this.header, 'transition', 'margin-top 0ms');
            this.renderer.setStyle(this.component, 'transition', 'margin-top 100ms');
            this.renderer.setStyle(this.component, 'transition-timing-function', 'linear');
            this.renderer.setStyle(this.header, 'transition', 'margin-top 200ms');

            if (this.isFirstLoad) {
                this.renderer.setStyle(this.header, 'margin-top', `-${this.header.clientHeight}px`);
            }
        });
    }

    @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
        if ($event.detail.scrollTop > 0) {
            this.domCtrl.write(() => {
                this.renderer.setStyle(this.header, 'margin-top', '0');
                this.renderer.setStyle(this.component, 'margin-top', `-${this.component.clientHeight}px`);

            });
        } else {
            this.domCtrl.write(() => {

                this.renderer.setStyle(this.component, 'margin-top', '0');
                this.renderer.setStyle(this.header, 'margin-top', `-${this.header.clientHeight}px`);
            });
        }
        this.lastY = $event.detail.scrollTop;
    }

}
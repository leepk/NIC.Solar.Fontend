import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Directive({
    selector: '[appDelayClick]'
})
export class DelayClickDirective implements OnInit, OnDestroy {
    @Input() delayTime = 500;
    @Output() delayClick = new EventEmitter();
    private clicks = new Subject();
    private subscription: Subscription;
    private clicking = false;
    
    constructor() { }

    ngOnInit() {
        //this.subscription = this.clicks.pipe(
        //    debounceTime(this.debounceTime)
        //).subscribe(e => this.debounceClick.emit(e));
        
        this.subscription = this.clicks.subscribe(e => {
            if (!this.clicking) {
                this.delayClick.emit(e);
                this.clicking = true;
                setTimeout(() => {
                    this.clicking = false;
                }, this.delayTime);
            } else {
            }
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener('click', ['$event'])
    clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}
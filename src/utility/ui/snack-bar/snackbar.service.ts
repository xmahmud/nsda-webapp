import { Injectable, ComponentFactoryResolver, ViewContainerRef, ApplicationRef } from '@angular/core';
import { SnackBarComponent } from './snack-bar.component';

@Injectable()
export class SnackbarService {

    private factory: ComponentFactoryResolver;
    private host: ViewContainerRef;
    private componentRefArray = [];
    private singleSnackbarIds = [];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private applicationRef: ApplicationRef
    ) {
        this.factory = componentFactoryResolver;
    }

    public setHost(host: ViewContainerRef) { 
        this.host = host;
    }

    public isOpenSingleSnackbar(id: any) {
        const find = this.singleSnackbarIds.filter(x => x === id);
        if (!find || find.length <= 0) {
            return false;
        }
        return true;
    }

    public open(data: ISnackbarData) {
        if (data.showSnackbarOnceId) {
            if (!this.isOpenSingleSnackbar(data.showSnackbarOnceId)) {
                this.singleSnackbarIds.push(data.showSnackbarOnceId);
                return this._open(data);
            }
        } else {
            return this._open(data);
        }
    }

    public success(message: string, duration?: number, preventSelfClose?: boolean) {
        this.open(<ISnackbarData>{
            data: {
                message: message,
                icon: 'fas fa-check-circle snackbar-icon'
            },
            type: TYPE.SUCCESS,
            duration: duration,
            preventSelfClose: preventSelfClose
        });
    }

    public error(message: string, duration?: number, preventSelfClose?: boolean) {
        this.open(<ISnackbarData>{
            data: {
                message: message,
                icon: 'fas fa-exclamation snackbar-icon'
            },
            type: TYPE.ERROR,
            duration: duration,
            preventSelfClose: preventSelfClose
        });
    }

    public info(message: string, duration?: number, preventSelfClose?: boolean) {
        this.open(<ISnackbarData>{
            data: {
                message: message,
                icon: 'fas fa-info snackbar-icon'
            },
            type: TYPE.INFO,
            duration: duration,
            preventSelfClose: preventSelfClose
        });
    }

    public warning(message: string, duration?: number, preventSelfClose?: boolean) {
        this.open(<ISnackbarData>{
            data: {
                message: message,
                icon: 'fas fa-exclamation-triangle snackbar-icon'
            },
            type: TYPE.WARNING,
            duration: duration,
            preventSelfClose: preventSelfClose
        });
    }

    public closeSingle(id: string) {
        this.componentRefArray.forEach(e => {
            if (e.data.showSnackbarOnceId === id) {
                const indexOf = this.singleSnackbarIds.indexOf(e.data.showSnackbarOnceId);
                if (indexOf > -1) {
                    this.singleSnackbarIds.splice(indexOf, 1);
                }
                e.close();
            }
        });
    }

    public close() {
        this.componentRefArray.forEach(e => {
            e.close();
        });
    }

    private _open(data: ISnackbarData) { 
        const duration = data.duration || 3000;
        data.type = data.type || TYPE.SUCCESS;
        const factory = this.factory.resolveComponentFactory(SnackBarComponent);
        const c = factory.create(this.host.parentInjector);
        this.host.insert(c.hostView);
        c.instance.data = data;
        this.applicationRef.tick();
        c.instance['close'] = () => this.onCloseDependency(c);
        if (!data.preventSelfClose) {
            setTimeout(() => c.instance['close'](), duration);
        }
        if (data.preventSelfClose === true) {
            this.componentRefArray.push(c.instance);
        }
        return c;
    }

    private onCloseDependency(c) {
        if (c) {
            if (c.instance['onCloseListener']) {
                c.instance['onCloseListener'].forEach(onClose => {
                    onClose();
                });
            }
            const indexOf = this.singleSnackbarIds.indexOf(c.instance.data.showSnackbarOnceId);
            if (indexOf > -1) {
                this.singleSnackbarIds.splice(indexOf, 1);
            }
            c.destroy();
            this.applicationRef.tick();
        }
    }

}

export interface ISnackbarData {
    showSnackbarOnceId?: any;
    data: any;
    type?: any;
    duration?: number;
    preventSelfClose?: boolean;
    keepExistingSnack?: boolean;
}

export const TYPE = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error'
};

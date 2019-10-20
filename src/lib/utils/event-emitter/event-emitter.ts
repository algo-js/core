export type TEventName = string | symbol;
export type TEventCallback<T> = (a: T, ...args: any[]) => void;

export interface ListenEvents<T> {
  on: (eventName: TEventName, fn: TEventCallback<T>) => EventEmitter<T>;
  once: (eventName: TEventName, fn: TEventCallback<T>) => EventEmitter<T>;
  off: (eventName: TEventName, fn: TEventCallback<T>) => EventEmitter<T>;
  addListener: (
    eventName: TEventName,
    fn: TEventCallback<T>
  ) => EventEmitter<T>;
  removeListener: (
    eventName: TEventName,
    fn: TEventCallback<T>
  ) => EventEmitter<T>;
  removeAllListeners: (eventName: TEventName) => EventEmitter<T>;

  eventNames: () => TEventName[];
}

export interface EmitEvents<T> {
  emit: (eventName: TEventName, value: T, ...args) => boolean;
}

export class EventEmitter<T> implements EmitEvents<T>, ListenEvents<T> {
  private listenersMap = new Map<TEventName, Array<Array<TEventCallback<T>>>>();

  /**
   * @param {TEventName} eventName
   * @param {TEventCallback} cb
   * @returns {EventEmitter}
   */
  public on(eventName: TEventName, cb: TEventCallback<T>): this {
    if (!this.hasEventContainer(eventName)) {
      this.createEventContainer(eventName);
    }

    const container = this.getEventContainer(eventName);

    container.push([cb]);

    return this;
  }

  /**
   * @param {TEventName} eventName
   * @param {TEventCallback} cb
   * @returns {EventEmitter}
   */
  public once(eventName: TEventName, cb: TEventCallback<T>): this {
    if (!this.hasEventContainer(eventName)) {
      this.createEventContainer(eventName);
    }

    const container = this.getEventContainer(eventName);

    const wrapped = (value: T, ...args) => {
      this.off(eventName, wrapped);
      cb(value, ...args);
    };

    container.push([wrapped, cb]);

    return this;
  }

  /**
   * @param {TEventName} eventName
   * @param {TEventCallback} cb
   * @returns {EventEmitter}
   */
  public off(eventName: TEventName, cb: TEventCallback<T>): this {
    const container = this.getEventContainer(eventName);

    if (!container) {
      return this;
    }

    const index = container.findIndex(item => {
      return item.includes(cb);
    });

    if (index >= 0) {
      container.splice(index, 1);
    }

    return this;
  }

  /**
   * @param {TEventName} eventName
   * @param {*} value
   * @param {*} args
   * @returns {boolean}
   */
  public emit(eventName: TEventName, value: T, ...args): boolean {
    const container = this.getEventContainer(eventName);

    if (!container) {
      return false;
    }

    for (const [cb] of container) {
      cb(value, ...args);
    }

    return container.length > 0;
  }

  /**
   * @param {TEventName} eventName
   * @param {TEventCallback} cb
   * @returns {EventEmitter}
   */
  public addListener(eventName: TEventName, cb: TEventCallback<T>): this {
    return this.on(eventName, cb);
  }

  /**
   * @param {TEventName} eventName
   * @param {TEventCallback} cb
   * @returns {EventEmitter}
   */
  public removeListener(eventName: TEventName, cb: TEventCallback<T>): this {
    return this.off(eventName, cb);
  }

  /**
   * @param {TEventName?} [eventName]
   * @returns {EventEmitter}
   */
  public removeAllListeners(eventName: TEventName = null): this {
    if (eventName) {
      this.deleteEventContainer(eventName);
    } else {
      this.listenersMap.clear();
    }

    return this;
  }

  /**
   * @returns {TEventName[]}
   */
  public eventNames(): TEventName[] {
    return [...this.listenersMap.keys()];
  }

  /**
   * @param {TEventName} eventName
   */
  private createEventContainer(eventName: TEventName): void {
    this.listenersMap.set(eventName, []);
  }

  /**
   * @param {TEventName} eventName
   */
  private deleteEventContainer(eventName: TEventName): void {
    this.listenersMap.delete(eventName);
  }

  /**
   * @param {TEventName} eventName
   */
  private getEventContainer(
    eventName: TEventName
  ): Array<Array<TEventCallback<T>>> {
    return this.listenersMap.get(eventName);
  }

  /**
   * @param {TEventName} eventName
   */
  private hasEventContainer(eventName: TEventName): boolean {
    return this.listenersMap.has(eventName);
  }
}

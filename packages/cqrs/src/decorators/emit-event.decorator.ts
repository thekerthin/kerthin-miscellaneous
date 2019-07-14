import { EventBus } from '../event-bus';

export function EmitEvent({ context, action }) {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const eventBusPropName = Object.keys(this)
        .find(key => this[key] instanceof EventBus);

      if (!eventBusPropName) {
        throw new Error("If you wish to use '@EmitEvent' decorator you should inject 'EventBus' in your class");
      }

      const result = original.apply(this, args);

      const eventData = {
        context: <string>context, action: <string>action, data: <any>args,
      };

      await this[eventBusPropName].publish(eventData);

      return result;
    };

    return descriptor;
  };
}

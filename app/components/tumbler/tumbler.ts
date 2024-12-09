import { GridLayout, Label } from '@nativescript/core';
import { Property, View } from '@nativescript/core';

export const currentRestaurantProperty = new Property<Tumbler, string>({
    name: 'currentRestaurant',
    defaultValue: '',
    valueConverter: (v) => v
});

@GridLayout.register()
export class Tumbler extends GridLayout {
    currentRestaurant: string;

    static get meta() {
        return {
            name: 'Tumbler',
            template: `
                <GridLayout>
                    <ContentView>
                        <Placeholder />
                    </ContentView>
                </GridLayout>
            `
        };
    }

    constructor() {
        super();
    }

    [currentRestaurantProperty.setNative](value: string) {
        const tumblerText = this.getViewById('tumblerText') as Label;
        if (tumblerText) {
            tumblerText.text = value;
        }
    }
}

currentRestaurantProperty.register(Tumbler);
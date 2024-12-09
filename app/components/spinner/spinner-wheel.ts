import { GridLayout } from '@nativescript/core';

@GridLayout.register()
export class SpinnerWheel extends GridLayout {
    public static get meta() {
        return {
            name: "SpinnerWheel",
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
}
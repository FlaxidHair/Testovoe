import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#0f4c82',
                secondary: '#ffffff',
                accent: '#82B1FF',
                error: '#df2b2b',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FFC107',
                customColor: '#FF5722'
            },
        },
        customProperties: true,
    },
});

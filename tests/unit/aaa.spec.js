import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Inventario from '@/views/Inventario.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('Inventario.vue', () => {
let state;
let store;

beforeEach(() => {
state = {
producto : []
}

store = new Vuex.Store({state});
});

it('given no sell it must show a message "Sin ventas realizadas"', () => {
const wrapper = shallowMount(Inventario, {store,localVue})
let trNoStock = wrapper.findAll('<td colspan="5">Sin productos en el inventario</td>').at(0);
expect(trNoStock.text()).toBe("Sin ventas realizadas");
})
})


Este chequea que cuando no haya ventas se muestre el texto “Sin ventas realizadas”

Importación de Vuex y el componente a testear

import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Inventario from '@/views/Ventas.vue'

Inicialización  del Store con ventas en vacío

beforeEach(() => {
state = {
ventas : []
}

store = new Vuex.Store({state});
});

1. const wrapper = shallowMount(Inventario, {store,localVue}) => Se monta el componente con vuex.

2. et trNoStock = wrapper.findAll('tbody tr td').at(0); => Se captura la primera fila de la tabla

3. expect(trNoStock.text()).toBe("Sin ventas realizadas"); =>Se verifica que tenga el texto Sin ventas realizadas

it('given no sell it must show a message "Sin ventas realizadas"', () => {
const wrapper = shallowMount(Inventario, {store,localVue})
let trNoStock = wrapper.findAll('tbody tr td').at(0);
expect(trNoStock.text()).toBe("Sin ventas realizadas");
})
})

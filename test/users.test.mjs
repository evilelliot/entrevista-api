import assert from 'assert';
import request from 'supertest';
import app from '../src/main.mjs';

describe('Endpoint /users/list', () => {
    it('debería devolver una lista de usuarios', async () => {
        const response = await request(app).get('/users/list');
        assert.equal(response.status, 201);
        // Verifica la estructura de la respuesta
        assert.equal(response.body.status, 'success');
        assert.equal(response.body.message, 'Lista de usuarios');
        assert.ok(response.body.data.raw);
        // Verifica que la lista de usuarios no esté vacía
        assert.ok(response.body.data.raw.length > 0);
    });
});
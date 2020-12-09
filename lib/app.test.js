const fs = require('fs');
const request = require('supertest');
const Song = require('../lib/models/Song');
const app = require('../lib/sql/app.js');
const pool = require('../lib/utils/pool');




describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./lib/sql/setup.sql', 'utf-8'));
  });
  
  afterAll(() => {
    return pool.end();
  });
  
  it('creates a song via POST', async() => {
    const response = await request(app)
      .post('/api/v1/songs')
      .send({
        title: 'memories',
        description: 'remembering',
        url: 'songs.url'
      });
  
    expect(response.body).toEqual({
      id: '1',
      title: 'memories',
      description: 'remembering',
      url: 'songs.url'

    });
  });

  it('finds a song by id via GET', async() => {
    const song = await Song.insert({ title: 'recall', description: 'recollections', url: 'songs.url' });
    
    const response = await request(app)
      .get(`/api/v1/songs/${song.id}`);
    
    expect(response.body).toEqual(song);
  });
    
  it('updates a song by id via PUT', async() => {
    const song = await Song.insert({ title: 'rock', description: 'metal', url: 'songs.url' });
    
    const response = await request(app)
      .put(`/api/v1/songs/${song.id}`)
      .send({
        title: 'dreams',
        description: 'sleeping',
        url: 'lyrics.url'
        

      });
    
    expect(response.body).toEqual({
      ...song,
      title: 'dreams',
      description: 'sleeping',
      url: 'lyrics.url'
    });
  });
  it('removes a song by id via DELETE', async() => {
    const song = await Song.insert({ title: 'recall', description: 'recollections', url: 'songs.url' });
    
    const response = await request(app)
      .delete(`/api/v1/songs/${song.id}`);
    
    expect(response.body).toEqual(song);

  });
});
  

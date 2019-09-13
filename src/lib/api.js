/**
 * API Client
 * @author Jared Allard <jaredallard@outlook.com>
 * @license MIT
 * @version 1
 */

import qs from 'query-string'

class API {
  constructor(apiKey, apiURL = "https://api.tritonjs.com") {
    this.apiKey = apiKey
    this.apiURL = apiURL.replace(/\/$/, '')
  }

  /**
   * Make a request
   * 
   * @param {String} [method='GET'] method for HTTP request
   * @param {String} endpoint of API URL to hit
   * @param {Object} [param={}] url params
   * @param {Object} [headers={}] headers
   * @param {Object} [body={}]
   */
  async req (method, endpoint, headers = {}, params = {}, body = {}) {
    // append headers we need
    if (method === 'POST' || method === 'PUT') {
      headers['Content-Type'] = 'application/json'
    }

    // auth
    headers['Authorization'] = this.apiKey

    // support url params
    let url = this.apiURL + endpoint
    if (Object.keys(params).length !== 0) {
      url += '?' + qs.stringify(params)
    }

    const sent = Date.now()
    const res = await fetch(url, {
      method: method,
      mode: 'cors',
      headers,
      body: Object.keys(body).length === 0 ? undefined : body,
    })
    const resp = await res.json()
    const recv = Date.now()

    console.log(res.status.toString(), `${recv - sent}ms`, method, endpoint, resp)
    
    // error occured, throw it
    if (!resp.data && resp.metadata && !resp.metadata.success) {
      throw new Error(resp.metadata.error_message)
    }

    return resp
  }

  /**
   * Set API key
   * @param {Striong} apiKey new api key
   */
  setAPIKey(apiKey) {
    this.apiKey = apiKey
  }

  /**
   * Return a list of series on the meida server
   * @param {String} type of series
   * @returns {Object[]} series found
   */
  async listSeries(type = "") {
    return this.req('GET', '/v1/series', {}, {
      type,
    })
  }

  /**
   * Return a list of series on the meida server
   * @param {String} id id of the series
   * @returns {Object} series
   */
  async getSeries(id) {
    return this.req('GET', `/v1/series/${id}`)
  }
  
  /**
   * Return a list of files for an episode
   * @param {String} seriesId series id
   * @param {String} episodeId epsiode id
   */
  async getEpisodeFiles(seriesId, episodeId) {
    return this.req('GET', `/v1/episodes/${seriesId}/files/${episodeId}`)
  }

  /**
   * Return a list of subtitiles for an episode
   * @param {String} seriesId series id
   * @param {String} episodeId epsiode id
   */
  async getSubtitles(seriesId, episodeId) {
    return this.req('GET', `/v1/subtitles/${seriesId}/${episodeId}`)
  }

  /**
   * Return all episodes that are part of a series, returns a -1
   * if a series is a movie
   * @param {String} seriesId series id
   */
  async listEpisodes(seriesId) {
    return this.req('GET', `/v1/episodes/${seriesId}`)
  }
}

export default API
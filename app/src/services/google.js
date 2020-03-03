import axios from 'axios'
import humps from 'humps'
import store from '../redux/store'
import { fetchUserPending, fetchUserRejected, fetchUserSuccess, setView } from '../redux'

export async function fetchUser(options){
  const accessToken = localStorage.getItem('google_access_token');
  const { view } = store.getState()

  store.dispatch(fetchUserPending())
  try {
    const resp = await axios({
      method: 'get',
      url: 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      transformResponse: [
        ...axios.defaults.transformResponse,
        data => humps.camelizeKeys(data)
      ]
    })
    store.dispatch(fetchUserSuccess(resp.data))

    if (view.previous) store.dispatch(setView(view.previous))
    else store.dispatch(setView('NatLang'))

  } catch (e) {
    if (e.response && e.response.status === 401) {
      localStorage.clear()
      store.dispatch(fetchUserRejected(e))
      store.dispatch(setView('Login'))
    }
    return null
  }
}

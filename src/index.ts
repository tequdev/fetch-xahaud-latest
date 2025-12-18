import { Hono } from 'hono'

const app = new Hono()

const URL = "https://build.xahau.tech/"

const getFilenames = async (releaseType: string) => {
  const response = await fetch(URL)
  const text = await response.text() as string
  return (text.match(/>[^<]+</g) || [])
    .map(filename => filename.replace(/>|</g, ''))
    .filter(filename => filename.match(/^\S+\+[0-9]{2,4}$/))
    .filter(filename => filename.includes(releaseType))
    .sort((a, b) => parseInt(b.split('+')[1]) - parseInt(a.split('+')[1]))
}

app.get('/', async (c) => {
  const releaseType = 'release'
  const filenames = await getFilenames(releaseType)
  
  if (filenames.length === 0)
    return c.json({ error: 'File not found' }, 404)
  
  return c.redirect(URL + filenames[0], 302)
})


app.get('/release/:releaseType?', async (c) => {
  const releaseType = c.req.param('releaseType') || 'release'
  const filenames = await getFilenames(releaseType)
  
  if (filenames.length === 0)
    return c.json({ error: 'Invalid release type' }, 400)
  
  return c.redirect(URL + filenames[0], 302)
})

app.get('/releases/:releaseType?', async (c) => {
  const releaseType = c.req.param('releaseType') || 'release'
  const filenames = await getFilenames(releaseType)
  
  if (filenames.length === 0)
    return c.json({ error: 'Invalid release type' }, 400)
  
  return c.json(filenames)
})

export default app

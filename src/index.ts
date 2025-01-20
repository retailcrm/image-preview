export function preview (
  workers: string[],
  url: string,
  resize: string | undefined = undefined,
  crop: string | undefined = undefined
) {
  if (workers.length === 0) {
    return url
  }

  const worker = workers[Math.floor(Math.random() * workers.length)]

  return  `//${worker}/r/${resize || '90x90'}${crop ? '/c/' + crop : ''}/${url}`
}

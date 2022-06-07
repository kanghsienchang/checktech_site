export default function ({ query, enablePreview }) {
  if (process.env.NODE_ENV === 'development' && query.preview) {
    enablePreview()
  }
}

module.exports = async function ($) {
  $.page.title = 'Ready to create'

  return /* HTML */ `
    <h1>Welcome to your new application.</h1>
    <p>Are you excited to get started?</p>
    <p>
      <a href="https://ndk.sh">Here is the documentation!</a>
    </p>
  `
}

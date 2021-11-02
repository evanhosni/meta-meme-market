document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/upload');
  const data = await response.json();

  const options = {
    cloudName: data.cloudname,
    uploadPreset: data.uploadpreset,
    apiKey: data.apikey,
    uploadSignatureTimestamp: data.timestamp,
    uploadSignature: data.signature,
    sources: [
      "local"
    ],
    googleApiKey: "<image_search_google_api_key>",
    showAdvancedOptions: false,
    cropping: true,
    multiple: false,
    defaultSource: "local",
    styles: {
        palette: {
            window: "#000000",
            sourceBg: "#000000",
            windowBorder: "#AFAFAF",
            tabIcon: "#FFFFFF",
            inactiveTabIcon: "#AFAFAF",
            menuIcons: "#FFFFFF",
            link: "#FFFFFF",
            action: "#FFFFFF",
            inProgress: "#FFFFFF",
            complete: "#33ff00",
            error: "#EA2727",
            textDark: "#000000",
            textLight: "#000000"
        },
        fonts: {
            default: null,
            "'Space Mono', monospace": {
                url: "https://fonts.googleapis.com/css?family=Space+Mono",
                active: true
            }
        }
    }
  }

  const processResults = (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log(result)
      
      var str = JSON.stringify(result, null, 4);
    }
  }

  const myWidget = window.cloudinary.createUploadWidget(
    options,
    processResults
  )
  document
    .getElementById('upload_widget')
    .addEventListener('click', () => myWidget.open(), false)
})
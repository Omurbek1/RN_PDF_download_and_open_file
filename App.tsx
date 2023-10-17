import {Button, Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';

export default function App() {
  
  const downloadFile = () => {
    const source = "https://www.africau.edu/images/default/sample.pdf";
    let dirs = ReactNativeBlobUtil.fs.dirs;
    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: `${dirs.DocumentDir}/${source}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: source,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', source)
      .then((res) => {
        // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
        // whereas in android, the download manager is handling the download for us.
        if (Platform.OS === 'ios') {
          const filePath = res.path();
          let options = {
            type: 'application/pdf',
            url: filePath,
            saveToFiles: true,
          };
          Share.open(options)
            .then((resp) => console.log(resp))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log('BLOB ERROR -> ', err));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Download PDF file</Text>
      <Button title="download" onPress={downloadFile} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 130,
  },
});

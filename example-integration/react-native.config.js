module.exports = {
    project:{
      android: {
        unstable_reactLegacyComponentNames: [
            "RNCSafeAreaProvider"
        ]
      },
      ios: {
        unstable_reactLegacyComponentNames: [
            // list of conponents that needs to be wrapped by the interop layer
        ]
      }
    },
  };
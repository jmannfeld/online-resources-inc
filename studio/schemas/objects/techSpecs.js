export default {
  title: 'Tech specs',
  name: 'techSpecs',
  type: 'object',
  description: 'Specifications left empty will not be displayed',
  options: {
    columns: 2,
    collapsible: true,
    collapsed: true
  },
  fields: [
    {
      title: 'Accuracy',
      name: 'accuracy',
      type: 'string'
    },
    {
      title: 'Volumetric accuracy',
      name: 'volumetricAccuracy',
      type: 'string'
    },
    {
      title: 'Weight',
      name: 'weight',
      type: 'string'
    },
    {
      title: 'Dimensions',
      name: 'dimensions',
      type: 'string'
    },
    {
      title: 'Resolution',
      name: 'resolution',
      type: 'string'
    },
    {
      title: 'Scanning area',
      name: 'scanningArea',
      type: 'string'
    },
    {
      title: 'Measurement resolution',
      name: 'measurementResolution',
      type: 'string'
    },
    {
      title: 'Measurement rate',
      name: 'measurementRate',
      type: 'string'
    },
    {
      title: 'Mesh resolution',
      name: 'meshResolution',
      type: 'string'
    },
    {
      title: 'Depth of field',
      name: 'depthOfField',
      type: 'string'
    },
    {
      title: 'Light source',
      name: 'lightSource',
      type: 'string'
    },
    {
      title: 'Laser class',
      name: 'laserClass',
      type: 'string'
    }
  ]
};

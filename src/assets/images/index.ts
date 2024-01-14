export const CATEGORY_ICONS = [
  {
    name: 'logo',
    icon: require('./logo.png'),
  },
  {
    name: 'skin-care',
    icon: require('./skin-care.png'),
  },
  {
    name: 'bottles',
    icon: require('./bottles.png'),
  },
  {
    name: 'cereals',
    icon: require('./cereals.png'),
  },
  {
    name: 'medicine',
    icon: require('./medicine.png'),
  },
  {
    name: 'detergent',
    icon: require('./detergent.png'),
  },
];

export const getIconByName = (iconName: string) => {
  return CATEGORY_ICONS.find(i => i.name === iconName)?.icon || null;
};

export const flavours = [
  { id: 'classic', name: 'Classic', note: 'Where it all begins.', text: 'Tangy-sweet pineapple, lightly fizzy, with the warm character of cinnamon and cloves.', ingredients: ['Pineapple', 'Boiled water', 'Sugar', 'Cinnamon stick', 'Whole cloves'], profile: ['Pineapple tang', 'Gentle sweetness', 'Warm spice'], colour: '#a18b36', image: 'classic.webp' },
  { id: 'mango', name: 'Mango', note: 'A tropical state of mind.', text: 'Mango brings a rounded tropical sweetness to pineapple tang, with cinnamon and cloves in the background.', ingredients: ['Pineapple', 'Boiled water', 'Sugar', 'Cinnamon stick', 'Whole cloves', 'Mango'], profile: ['Tropical mango', 'Pineapple tang', 'Soft spice'], colour: '#b47822', image: 'mango.webp' },
  { id: 'spicy', name: 'Spicy', note: 'Turn up the character.', text: 'Ginger warmth and green-chilli heat meet tangy-sweet pineapple. A spirited expression with a spiced finish.', ingredients: ['Pineapple', 'Boiled water', 'Sugar', 'Cinnamon stick', 'Whole cloves', 'Ginger', 'Green chilli'], profile: ['Ginger warmth', 'Green-chilli heat', 'Bright pineapple'], colour: '#9a4f35', image: 'spicy.webp' },
  { id: 'og', name: 'OG', note: 'An original expression.', text: 'Brown cane sugar takes the place of white sugar, bringing a deeper sweetness to pineapple, cinnamon and cloves.', ingredients: ['Pineapple', 'Boiled water', 'Brown cane sugar', 'Cinnamon stick', 'Whole cloves'], profile: ['Brown cane sweetness', 'Pineapple tang', 'Warm spice'], colour: '#516541', image: 'og.webp' },
  { id: 'honey', name: 'Honey', note: 'A golden-hour mood.', text: 'Honey takes the place of sugar, pairing its distinctive sweetness with bright pineapple and warming spice.', ingredients: ['Pineapple', 'Boiled water', 'Honey', 'Cinnamon stick', 'Whole cloves'], profile: ['Honey sweetness', 'Bright pineapple', 'Gentle spice'], colour: '#9f6d25', image: 'honey.webp' },
];
export const classic = {
  ingredients: ['Pineapple', 'Boiled water', 'Sugar', 'Cinnamon stick', 'Whole cloves'],
  size: '250 ml',
  storage: 'Store refrigerated at 4°C or below at all times. Once opened, consume within 3 days or before the Use By date, whichever is sooner.',
  maker: 'Tepeeya, Kanchiyoorkonam, Kattakada P.O., Trivandrum, Kerala, 695572',
  email: 'tepeeya.tepache@gmail.com',
};
export const asset = (name) => `${import.meta.env.BASE_URL}media/${name}`;

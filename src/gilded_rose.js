function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) { // Quality never drops to negative
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1 //
          if(items[i].name == 'Conjured Mana Cake' && items[i].quality > 0){ //if item is conjured and quality still not 0
            items[i].quality = items[i].quality - 1 //item quality degrades twice as fast (similar code down below for expired sell_in date) (only works for conjured mana cake in this case)
          }
        }
      }
    } else {
      if (items[i].quality < 50) { // Quality never goes above 50
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {                  // backstage pass quality update .
            if (items[i].quality < 50) {                //                               .
              items[i].quality = items[i].quality + 1   //                               .
            }                                           //                               .
          }                                             //                               .
          if (items[i].sell_in < 6) {                   //                               .
            if (items[i].quality < 50) {                //                               .
              items[i].quality = items[i].quality + 1   //            definitely refactor
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') { // Sulfuras never decreases in Quality or Date
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) { //for "normal" items, decreases twice as fast in quality, but still cant go negative
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
              if(items[i].name == 'Conjured Mana Cake' && items[i].quality > 0){ //if item is conjured and quality still not 0
                items[i].quality = items[i].quality - 1 //item quality degrades twice as fast (needs to be implemented here too in case theres ever anitem thats)
                                                        //conjured with higher sell_in dates and quality stats) (again, only conjured mana cake here)
              }
            }
          }
        } else { //ticket quality drops to 0
          items[i].quality = items[i].quality - items[i].quality
        }
      } else { //else Brie also starts INCREASING in quality twice as fast apparently
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}

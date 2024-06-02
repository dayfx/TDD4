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
          items[i].quality-- //
          if(items[i].name == 'Conjured Mana Cake' && items[i].quality > 0){ //if item is conjured and quality still not 0
            items[i].quality-- //item quality degrades twice as fast (similar code down below for expired sell_in date) (only works for conjured mana cake in this case)
          }
        }
      }
    } else {
      if (items[i].quality < 50) { // Quality never goes above 50
        items[i].quality++
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality < 50){
            if (items[i].sell_in < 11) {                          
              items[i].quality++                                       
            }                                        
            if (items[i].sell_in < 6) {       
              items[i].quality++                        
            }
            if (items[i].quality > 50) {
              items[i].quality = 50;
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') { // Sulfuras never decreases in Quality or Date
      items[i].sell_in--;
    }
    if(items[i].sell_in < 0) { // if expired
      if(items[i].name == 'Aged Brie') {
        if(items[i].quality < 50) {
          items[i].quality++; // Brie quality increases twice as fast
        } 
      } else if(items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
        items[i].quality = 0; // backstage passes drop to quality 0 after the concert
      } else if(items[i].name == 'Conjured Mana Cake') {
          if(items[i].quality > 0) { // technically never matters here, because quality cant go negative and sell_in dates and quality too low on conjured cake,
                                     // but technically for future other conjured items, this might become necessary to make sure double degradation is accounted for here too
            items[i].quality - 2;
            if (items[i].quality < 0) {
              items[i].quality = 0; //so quality cant go negative
            }
        } 
      } else {
        items[i].quality--;
        if(items[i].quality < 0) {
          items[i].quality = 0;
        } // normal items degrade twice as fast when expired
      }
  }
  }
}

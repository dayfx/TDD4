class Item{
    constructor(name, sell_in, quality) {
        this.name = name;
        this.sell_in = sell_in;
        this.quality = quality;
    }

    dayPasses() {
        if(this.name == 'Aged Brie') {
            this.updateAgedBrie();
        } else if(this.name == 'Sulfuras, Hand of Ragnaros') {
            this.updateSulfuras();
        } else if(this.name == 'Backstage passes to a TAFKAL80ETC concert') {
            this.updateBackstagePasses();
        } else if(this.name == 'Conjured Mana Cake') {
            this.updateConjured();
        } else {
            this.updateNormalItem();
        }

        this.decreaseSellin();
        this.checkExpired();
    }

    updateAgedBrie() {
        if(this.quality < 50) {
            this.quality++; // simpler than "this.quality == this.quality - 1;" (applies to similar refactored code aswell)
        }
    }

    updateSulfuras() {
        //nothing happens lol (legendary item)
    }

    updateBackstagePasses() {
        if(this.quality < 50) {
            this.quality++; //goes up by 1 by default
            if(this.sell_in < 11 && this.quality < 50) {
                this.quality++; // goes up by 2 if 10 or less days left until concert
            }
            if(this.sell_in < 6 && this.quality < 50) {
                this.quality++; //goes up by 3 if 5 or less days left until concert
            }
        }
    }

    updateConjured() {
        this.decreaseQuality(2); //quality degrades twice as fast as usual
    }

    updateNormalItem() {
        this.decreaseQuality(1);
    }

    decreaseQuality(amount) {
        if(this.quality > 0) {
            this.quality -= amount;
            if (this.quality < 0) {
                this.quality = 0; //so quality cant go negative
            }
        }
    }

    decreaseSellin() {
        if(this.name != 'Sulfuras, Hand of Ragnaros') {
        this.sell_in--; 
        }
    }

    checkExpired() {
        if(this.sell_in < 0) { // if expired
            if(this.name == 'Aged Brie') {
                this.updateAgedBrie(); // Brie quality increases twice as fast (so call function one more time)
            } else if(this.name == 'Backstage passes to a TAFKAL80ETC concert') {
                this.quality = 0; // backstage passes drop to quality 0 after the concert
            } else if(this.name == 'Conjured Mana Cake') {
                this.decreaseQuality(2); // technically never matters here, because quality cant go negative and sell_in dates and quality too low on conjured cake,
                                        // but technically for future other conjured items, this might become necessary
            } else {
                this.decreaseQuality(1); // normal items degrade twice as fast when expired
            }
        }
    }
}

var items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() { // much shorter :)
    for(var i = 0; i < items.length; i++) {
        items[i].dayPasses();
    }
}
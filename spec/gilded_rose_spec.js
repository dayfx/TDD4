describe("Gilded Rose", function() {

  it("General Chainvest test to make sure stats update as intended (NOT an official requirement)", function() {
    let days = 5;
    items = [ new Item("+5 Dexterity Vest", 10, 20) ];
    
    while(days != 0){
      update_quality();
      days--;
    }

    expect(items[0].name).toEqual("+5 Dexterity Vest");
    expect(items[0].sell_in).toEqual(5);
    expect(items[0].quality).toEqual(15);
  });

  it("Once the sell date has passed, quality degrades twice as fast", function() {
    let days = 12; //2 days over sell_in date
    items = [ new Item("+5 Dexterity Vest", 10, 20) ];
    
    while(days != 0){
      update_quality();
      days--;
    }

    expect(items[0].name).toEqual("+5 Dexterity Vest");
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(6); //decreases by 2 instead of 1 for 2 each of the 2 days over sell_in date
  });

  it("Quality of an item should never be negative", function() {
    let days = 20; //days well over sell_in date, quality should drop to 0
    items = [ new Item("+5 Dexterity Vest", 10, 20) ];
    
    while(days != 0){
      update_quality();
      days--;
    }

    expect(items[0].name).toEqual("+5 Dexterity Vest");
    expect(items[0].sell_in).toEqual(-10);
    expect(items[0].quality).toEqual(0); //stays at 0, doesn't go negative
  });

  it("Aged Brie increases in Quality the older it gets", function() {
    let days = 5; //3 days over "sell_in" date, so 3 days double increase 
    items = [ new Item("Aged Brie", 2, 0) ];
    
    while(days != 0){
      update_quality();
      days--;
    }

    expect(items[0].name).toEqual("Aged Brie");
    expect(items[0].sell_in).toEqual(-3);
    expect(items[0].quality).toEqual(8); 
  });

  it("Quality never goes above 50", function() {
    let days = 30; //item needs 26 days to hit quality 50
    items = [ new Item("Aged Brie", 2, 0) ];
    
    while(days != 0){
      update_quality();
      days--;
    }

    expect(items[0].name).toEqual("Aged Brie");
    expect(items[0].sell_in).toEqual(-28);
    expect(items[0].quality).toEqual(50); //but even with 4 extra days, quality does not go above 50
  });

  it("Sulfuras stats stay the same", function() {
    let days = 5; //days pass
    items = [ new Item("Sulfuras, Hand of Ragnaros", 0, 80) ];
    
    while(days != 0){
      update_quality();
      days--;
    }

    expect(items[0].name).toEqual("Sulfuras, Hand of Ragnaros");
    expect(items[0].sell_in).toEqual(0);
    expect(items[0].quality).toEqual(80); //stats stay the same
  });

  it("Backstage passes quality changes work as intended", function() {
    function fiveDays(){
      let days = 5; 
      items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ];
      
      while(days != 0){
        update_quality();
        days--;
      }
  
      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(10);
      expect(items[0].quality).toEqual(25); //quality goes up by 1 every day by default
    }

    function tenDays(){
      let days = 10; 
      items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ];
      
      while(days != 0){
        update_quality();
        days--;
      }
  
      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(5);
      expect(items[0].quality).toEqual(35); //quality goes up by 2 every day when sell_in date 10 or below
    }

    function thirteenDays(){
      let days = 13; 
      items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ];
      
      while(days != 0){
        update_quality();
        days--;
      }
  
      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(2);
      expect(items[0].quality).toEqual(44); //quality goes up by 3 every day when sell_in date 5 or below
    }

    function sixteenDays(){
      let days = 16; //one day after the concert
      items = [ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20) ];
      
      while(days != 0){
        update_quality();
        days--;
      }
  
      expect(items[0].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sell_in).toEqual(-1);
      expect(items[0].quality).toEqual(0); //quality drops to 0 after the concert
    }

    fiveDays();
    tenDays();
    thirteenDays();
    sixteenDays();

    //this needs to be refactored lol
  });

  it("Conjured items degrade twice as fast as normal items", function() {
    let days = 2;  
    items = [ new Item("Conjured Mana Cake", 3, 6) ];
    
    while(days != 0){
      update_quality();
      days--;
    }

    expect(items[0].name).toEqual("Conjured Mana Cake");
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(2); //item quality degrades twice as fast by default because conjured
  });

});

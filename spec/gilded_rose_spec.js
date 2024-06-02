describe("Gilded Rose", function() {

  it("General Chainvest test to make sure stats update as intended", function() {
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
    let days = 12; //days over sell_in date
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

});

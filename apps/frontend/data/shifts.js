// Parsed from DATA.csv
export const shiftTypes = [
  {
    type: 'CLEAN UP/INSPECTION',
    description: 'Make sure our warehouse is clean, presentable, and ready to host.',
    roles: [
      {
        name: 'Bathroom',
        numberAvailable: 2,
        description: 'Make sure bathrooms are clean and stocked. Check toilets, sinks, floors in all three bathrooms, cleaning if necessary. Check all toilet paper, paper towel, and soap dispensers in all three bathrooms, restock if necessary.'
      },
      {
        name: 'Snack bar (including stocking)',
        numberAvailable: 2,
        description: 'Organize snacks so that they are easy to grab when ordered. Restock fridge with non-alcoholic drinks if necessary. Place one of each item (snacks and non-alcoholic drinks) on counter for display. Get cash box and iPad from games director or finance director. Make sure iPad is on, working, and ready to process sales.'
      },
      {
        name: 'Bar (including stocking)',
        numberAvailable: 2,
        description: 'Restock fridge with alcoholic drinks if necessary. Place one of each item on counter for display. If there is a keg, make sure keg is in a bucket with ice and tapped. Make sure red plastic cups are ready to go on the table to the right of the ice maker. Put bags in two cans only buckets and make sure they are placed next to recycling and trash cans by the concessions area and front desk.'
      },
      {
        name: 'Track inspection & patching',
        numberAvailable: 2,
        description: 'Inspect sport court surface and track tape. Complete any cleaning or tape patching necessary.'
      }
    ]
  },
  {
    type: 'VOLUNTEER/SKATER CHECK-IN',
    description: 'Check in all skaters, volunteers, and officials as the arrive.',
    roles: [
      {
        name: 'Skater / Officials Check-In',
        numberAvailable: 1,
        description: 'If working the first shift, set up a table at the top of the stairs. If working the last shift, tear down and put away table. Check in skaters and officials as they arrive on the check in sheet, put on the correct wristband. Direct to the appropriate locker room.'
      },
      {
        name: 'Volunteer Check-In',
        numberAvailable: 1,
        description: 'If working the first shift, set up a table at the top of the stairs. If working the last shift, tear down and put away table. Check in volunteers as they arrive on the check in sheet, put on the correct wristband. Ensure photographers/videographers fill out the SRD Photographer/Videographer release if they have not previously submitted it to marketing.'
      }
    ]
  }
];

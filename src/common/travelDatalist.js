let getTravelData = {};

export default {
    getStore(self) {
        getTravelData = self.$store.getters.getTravelDetails;
        console.log('I am from Libarray ; ', getTravelData);
    },

    Details: [
        {

            card: [{
                title: "Contact Details",
                _id: 'C10',
                card: [{
                        label: 'First Name :',
                        data: 'Final dkk'
                    },

                    {
                        label: 'Last Name :',
                        data: 'dkdlanm'
                    },

                    {
                        label: 'Email Address :',
                        data: 'dk@grr.la'
                    },
                ]
            }]
        },

        {
            card: [{
                    title: "Trip Details",
                    _id: 'C1',
                    card: [{
                            label: 'Travelling to :',
                            data: 'Europe'
                        },
                        {
                            label: 'Trip Start Date :',
                            data: '2018-11-08'
                        },
                        {
                            label: 'Trip End Date :',
                            data: '2018-11-16'
                        },
                    ]

                }

            ]
        },
        {
            card: [{
                title: "Traveller Details-Traveller-1",
                _id: 'C2',
                card: [{
                        label: 'First Name :',
                        data: 'abhi'
                    },

                    {
                        label: 'Last Name :',
                        data: 'sheek'
                    },

                    {
                        label: 'Gender :',
                        data: 'male'
                    },

                    {
                        label: 'DOB :',
                        data: '600028200000'
                    },

                    {
                        label: 'Passport No :',
                        data: 'L9948WP'
                    },
                    {
                        label: 'Married :',
                        data: 'null'
                    },
                ]
            }]
        },
        {
            card: [{
                title: "Traveller-2",
                _id: 'C3',
                card: [{
                        label: 'First Name:',
                        data: 'Kunal'
                    },

                    {
                        label: 'Last Name:',
                        data: 'Khanna'
                    },

                    {
                        label: 'Gender:',
                        data: 'male'
                    },

                    {
                        label: 'DOB:',
                        data: '507925800000'
                    },

                    {
                        label: 'Passport No:',
                        data: 'L9284MP'
                    },
                    {
                        label: 'Married:',
                        data: 'null'
                    },
                    // {
                    //     label: 'Relationship With Traveller-1:',
                    //     data: 'Brother'
                    // },
                ]
            }]
        },

        // {
        //     card: [{
        //         title: "Traveller-3",
        //         _id: 'C4',
        //         card: [{
        //                 label: 'First Name:',
        //                 data: 'Shoaib'
        //             },

        //             {
        //                 label: 'Last Name:',
        //                 data: 'Khan'
        //             },

        //             {
        //                 label: 'Gender:',
        //                 data: 'male'
        //             },

        //             {
        //                 label: 'DOB:',
        //                 data: '507925800000'
        //             },

        //             {
        //                 label: 'Passport No:',
        //                 data: 'L9284MP'
        //             },
        //             {
        //                 label: 'Married:',
        //                 data: 'null'
        //             },
        //             // {
        //             //     label: 'Relationship With Traveller-1:',
        //             //     data: 'Brother'
        //             // },
        //         ]
        //     }]
        // },
        // {
        //     card: [{
        //         title: "Traveller-4",
        //         _id: 'C5',
        //         card: [{
        //                 label: 'First Name:',
        //                 data: 'usama'
        //             },

        //             {
        //                 label: 'Last Name:',
        //                 data: 'shaikh'
        //             },

        //             {
        //                 label: 'Gender:',
        //                 data: 'male'
        //             },

        //             {
        //                 label: 'DOB:',
        //                 data: '507925800000'
        //             },

        //             {
        //                 label: 'Passport No:',
        //                 data: 'L9284MP'
        //             },
        //             {
        //                 label: 'Married:',
        //                 data: 'null'
        //             },
        //             // {
        //             //     label: 'Relationship With Traveller-1:',
        //             //     data: 'Son'
        //             // },
        //         ]
        //     }]
        // },
        {
            card: [{
                title: "Plan Details",
                _id: 'C6',
                card: [{
                        label: 'Policy issued on :',
                        data: '13-11-2018'
                    },
                    {
                        label: 'Plan Name :',
                        data: 'Reliance Travel Plus'
                    },
                    // {
                    //     label: 'Age-1 :',
                    //     data: '56.0'
                    // },
                    // {
                    //     label: 'Age-2 :',
                    //     data: '34.0'
                    // },
                    {
                        label: 'Premium Amount :',
                        data: '940'
                    },
                    {
                        label: 'Status :',
                        data: 'Issued'
                    },
                    {
                        label: 'Is the trip starting from India :',
                        data: 'yes'
                    },
                    {
                        label: 'Are all the travellers resident of India :',
                        data: 'yes'
                    },
                ]
            }],
        },

        {
            card: [{
                title: "Address",
                _id: 'C7',
                card: [{
                        label: 'Pincode :',
                        data: '1743'
                    },

                    {
                        label: 'Address-1 :',
                        data: '134, Camarin Road'
                    },

                    {
                        label: 'Address-2 :',
                        data: 'Novaliches North'
                    },

                    {
                        label: 'Address-3 :',
                        data: 'Las Pinas'
                    },

                    {
                        label: 'City :',
                        data: 'Metro'
                    },
                    {
                        label: 'State :',
                        data: 'Manila'
                    },
                ]
            }]
        },

        {
            card: [{
                title: "Medical Details",
                _id: 'C8',
                card: [
                    // {
                    //     label: 'Travellers Listed Diseases :',
                    //     data: 'Sugar'
                    // },

                    {
                        label: 'Diseases :',
                        data: 'false'
                    },
                ]
            }]
        },

        // {
        //     docCard: [{
        //         title: "Document",
        //         card: [{
        //                 label: 'PAN :',
        //                 img: '../../web/assets/pan.png'
        //             },

        //             {
        //                 label: 'Driving licence :',
        //                 img: '../../web/assets/drivinglicense.png'
        //             },

        //             {
        //                 label: 'Aadhar :',
        //                 img: '../../web/assets/aadhar.png'
        //             },

        //             {
        //                 label: 'Previous policy document :',
        //                 img: '../../web/assets/priveus_policy.png'
        //             },

        //             {
        //                 label: 'Registration card :',
        //                 img: '../../web/assets/registration_card.png'
        //             },

        //         ]
        //     }]
        // }
    ]
}
import { PublicKey } from "@solana/web3.js";

// Placeholder - replace with your actual program ID
const PROGRAM_ID = new PublicKey("BJNDXDh57UnLvJgxaWM6u7Qer57DkpG2Aj4QWVNoSKBv");

// Placeholder IDL - replace with your actual IDL
const IDL = {
  "address": "BJNDXDh57UnLvJgxaWM6u7Qer57DkpG2Aj4QWVNoSKBv",
  "metadata": {
    "name": "restaurant_reviews",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "add_review",
      "discriminator": [
        0,
        87,
        29,
        155,
        61,
        216,
        35,
        190
      ],
      "accounts": [
        {
          "name": "restaurant",
          "writable": true
        },
        {
          "name": "review",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  118,
                  105,
                  101,
                  119
                ]
              },
              {
                "kind": "account",
                "path": "restaurant"
              },
              {
                "kind": "account",
                "path": "reviewer"
              }
            ]
          }
        },
        {
          "name": "reviewer",
          "writable": true,
          "signer": true
        },
        {
          "name": "reputation",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  112,
                  117,
                  116,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "reviewer"
              }
            ]
          }
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "rating",
          "type": "u8"
        },
        {
          "name": "review_cid",
          "type": "string"
        }
      ]
    },
    {
      "name": "delete_review",
      "discriminator": [
        217,
        101,
        10,
        71,
        231,
        220,
        241,
        202
      ],
      "accounts": [
        {
          "name": "review",
          "writable": true
        },
        {
          "name": "restaurant",
          "writable": true
        },
        {
          "name": "reputation",
          "writable": true
        },
        {
          "name": "reviewer",
          "signer": true,
          "relations": [
            "review"
          ]
        }
      ],
      "args": []
    },
    {
      "name": "register_restaurant",
      "discriminator": [
        185,
        205,
        121,
        175,
        153,
        11,
        176,
        26
      ],
      "accounts": [
        {
          "name": "restaurant",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  115,
                  116,
                  97,
                  117,
                  114,
                  97,
                  110,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "name"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "system_program",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "category",
          "type": "string"
        },
        {
          "name": "metadata_cid",
          "type": "string"
        }
      ]
    },
    {
      "name": "update_restaurant",
      "discriminator": [
        244,
        231,
        18,
        16,
        162,
        205,
        111,
        103
      ],
      "accounts": [
        {
          "name": "restaurant",
          "writable": true
        },
        {
          "name": "owner",
          "signer": true,
          "relations": [
            "restaurant"
          ]
        }
      ],
      "args": [
        {
          "name": "name",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "category",
          "type": {
            "option": "string"
          }
        },
        {
          "name": "metadata_cid",
          "type": {
            "option": "string"
          }
        }
      ]
    },
    {
      "name": "update_review",
      "discriminator": [
        254,
        84,
        60,
        221,
        68,
        163,
        94,
        29
      ],
      "accounts": [
        {
          "name": "review",
          "writable": true
        },
        {
          "name": "restaurant",
          "writable": true
        },
        {
          "name": "reviewer",
          "signer": true,
          "relations": [
            "review"
          ]
        }
      ],
      "args": [
        {
          "name": "new_rating",
          "type": {
            "option": "u8"
          }
        },
        {
          "name": "new_review_cid",
          "type": {
            "option": "string"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "Reputation",
      "discriminator": [
        55,
        148,
        90,
        71,
        68,
        183,
        193,
        28
      ]
    },
    {
      "name": "Restaurant",
      "discriminator": [
        78,
        223,
        161,
        249,
        112,
        221,
        199,
        78
      ]
    },
    {
      "name": "Review",
      "discriminator": [
        124,
        63,
        203,
        215,
        226,
        30,
        222,
        15
      ]
    }
  ],
  "events": [
    {
      "name": "RestaurantRegistered",
      "discriminator": [
        152,
        197,
        32,
        222,
        231,
        233,
        146,
        222
      ]
    },
    {
      "name": "RestaurantUpdated",
      "discriminator": [
        33,
        191,
        28,
        54,
        186,
        252,
        186,
        211
      ]
    },
    {
      "name": "ReviewAdded",
      "discriminator": [
        161,
        172,
        248,
        35,
        209,
        207,
        160,
        129
      ]
    },
    {
      "name": "ReviewDeleted",
      "discriminator": [
        136,
        183,
        132,
        234,
        177,
        55,
        246,
        125
      ]
    },
    {
      "name": "ReviewUpdated",
      "discriminator": [
        109,
        240,
        217,
        141,
        161,
        90,
        162,
        95
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "Unauthorized",
      "msg": "Unauthorized"
    },
    {
      "code": 6001,
      "name": "InvalidRating",
      "msg": "Rating must be between 1 and 5"
    },
    {
      "code": 6002,
      "name": "MathOverflow",
      "msg": "Math overflow"
    }
  ],
  "types": [
    {
      "name": "Reputation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "score",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "Restaurant",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "category",
            "type": "string"
          },
          {
            "name": "metadata_cid",
            "type": "string"
          },
          {
            "name": "rating_sum",
            "type": "u64"
          },
          {
            "name": "review_count",
            "type": "u64"
          },
          {
            "name": "created_at",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "RestaurantRegistered",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "restaurant",
            "type": "pubkey"
          },
          {
            "name": "owner",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "RestaurantUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "restaurant",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "Review",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "reviewer",
            "type": "pubkey"
          },
          {
            "name": "restaurant",
            "type": "pubkey"
          },
          {
            "name": "rating",
            "type": "u8"
          },
          {
            "name": "review_cid",
            "type": "string"
          },
          {
            "name": "created_at",
            "type": "i64"
          },
          {
            "name": "updated_at",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "ReviewAdded",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "review",
            "type": "pubkey"
          },
          {
            "name": "restaurant",
            "type": "pubkey"
          },
          {
            "name": "reviewer",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ReviewDeleted",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "review",
            "type": "pubkey"
          },
          {
            "name": "reviewer",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "ReviewUpdated",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "review",
            "type": "pubkey"
          },
          {
            "name": "reviewer",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
} as const;

export { IDL, PROGRAM_ID };
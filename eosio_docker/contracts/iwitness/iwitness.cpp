#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

// Smart Contract Name: notechain
// Table struct:
//   notestruct: multi index table to store the notes
//     prim_key(uint64): primary key
//     user(account_name/uint64): account name for the user
//     note(string): the note message
//     timestamp(uint64): the store the last update block time
// Public method:
//   isnewuser => to check if the given account name has note in table or not
// Public actions:
//   update => put the note into the multi-index table and sign by the given account

// Replace the contract class name when you start your own project
class iwitness : public eosio::contract {

  private:

    /// @abi table of CERTIFICATION TYPES
    struct certificate {

      uint64_t      prim_key;     // primary key
      account_name  issuer;       // account name for the user
      std::string   id;           // identifier
      std::string   name;         // certificate title
      std::string   description;  // certificate destription
      std::string[] tags          // search tags
      uint64_t      timestamp;    // the creation date of the certificate

      // primary key
      auto primary_key() const { return prim_key; }
      account_name get_by_issuer() const { return issuer; }

    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< N(certificate), certificate,
      indexed_by< N(getbyuser), const_mem_fun<certificate, account_name, &certificate::get_by_issuer> >
      > certtable;



    /// @abi table of APPLICATIONS
    struct application {}


  public:
    using contract::contract;

    /// Issue a new type of certificate
    void issue_certificate( account_name  _user,
                            std::string&  _id,
                            std::string   _name,
                            std:string    _description,
                            std::string[] _tags ) {

      // to sign the action with the given account
      require_auth( _user );

      certtable obj(_self, _self); // code, scope

      // insert object
      obj.emplace( _self, [&]( auto& address ) {
        address.prim_key    = obj.available_primary_key();
        address.issuer      = _user;
        address.id          = _id;
        address.name        = _name;
        address.description = _description;
        address.tags        = _tags;
        address.timestamp   = now();
      });
      
    }


    /// Apply for a certificate
    void create_application() {

    }

    /// Process an application as a 
    void process_application() {

    }


    /// Verify a user's claimed credential
    void verify_claim() {

    }


};

// specify the contract name, and export a public action: update
EOSIO_ABI( iwitness, (update) )

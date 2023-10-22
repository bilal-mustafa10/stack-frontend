import { v4 as uuid } from 'uuid';
import { userSession } from './auth';
import { Storage } from '@stacks/storage';

const storage = new Storage({ userSession });
const CONTRACTS_FILENAME = 'smartContracts.json';

export const defaultContracts = [
  {
    id: uuid(),
    contractName: 'Smart Contract 1',
    contractType: 'ERC-20',
    contractDescription: 'This is a fungible token smart contract',
    contractAddress: '0x1234567890',
    contractPeople: 2,
  },
  {
    id: uuid(),
    contractName: 'Smart Contract 2',
    contractType: 'ERC-721',
    contractDescription: 'This is a non-fungible token smart contract',
    contractAddress: '0x0987654321',
    contractPeople: 3,
  },
  {
    id: uuid(),
    contractName: 'Mortgage Agreement',
    contractType: 'Real Estate',
    contractDescription: 'This contract handles mortgage-related transactions',
    contractAddress: '0xabcdef1234',
    contractPeople: 4,
  },
  {
    id: uuid(),
    contractName: 'Supply Chain',
    contractType: 'Logistics',
    contractDescription: 'Manages supply chain events and states',
    contractAddress: '0x567890abcdef',
    contractPeople: 6,
  },
  {
    id: uuid(),
    contractName: 'Voting System',
    contractType: 'Governance',
    contractDescription: 'A secure, decentralized voting contract',
    contractAddress: '0x1122334455',
    contractPeople: 5,
  },
  {
    id: uuid(),
    contractName: 'DeFi Lending',
    contractType: 'Finance',
    contractDescription: 'Decentralized lending and borrowing',
    contractAddress: '0x665544332211',
    contractPeople: 7,
  },
  {
    id: uuid(),
    contractName: 'Loyalty Program',
    contractType: 'Retail',
    contractDescription: 'A contract to manage customer loyalty points',
    contractAddress: '0x9876543210',
    contractPeople: 2,
  },
  {
    id: uuid(),
    contractName: 'Auction House',
    contractType: 'Auction',
    contractDescription: 'Manages bidding and finalization of auctions',
    contractAddress: '0x2468135790',
    contractPeople: 4,
  },
  {
    id: uuid(),
    contractName: 'Digital Rights Management',
    contractType: 'Media',
    contractDescription: 'Handles the distribution and access of digital media',
    contractAddress: '0x1029384756',
    contractPeople: 3,
  },
  {
    id: uuid(),
    contractName: 'Healthcare Records',
    contractType: 'Healthcare',
    contractDescription: 'Securely manages healthcare records',
    contractAddress: '0x7890123456',
    contractPeople: 5,
  },
  {
    id: uuid(),
    contractName: 'Smart Energy Grid',
    contractType: 'Utilities',
    contractDescription: 'Manages distribution of energy in a smart grid',
    contractAddress: '0x5152535455',
    contractPeople: 6,
  },
  {
    id: uuid(),
    contractName: 'Freelance Agreement',
    contractType: 'Employment',
    contractDescription: 'Standard contract for freelancers and clients',
    contractAddress: '0x0102030405',
    contractPeople: 2,
  },
];


export const saveContracts = async (userSession, contracts, isPublic) => {
  await storage.putFile(CONTRACTS_FILENAME, JSON.stringify({ contracts, isPublic }), {
    encrypt: !isPublic,
    dangerouslyIgnoreEtag: true,
  });
};

export const fetchContracts = async (userSession, username) => {
  try {
    const contractsJSON = await storage.getFile(CONTRACTS_FILENAME, {
      decrypt: false,
      username: username || undefined
    });
    if (contractsJSON) {
      const json = JSON.parse(contractsJSON);
      if (json.isPublic) {
        return {
          contracts: json.contracts,
          public: true,
        };
      } else {
        if (!username) {
          const decrypted = JSON.parse(await userSession.decryptContent(contractsJSON));
          return {
            contracts: decrypted.tasks,
            public: false,
          };
        }
      }
    } else {
      return {
        contracts: username ? null : defaultContracts,
        public: false,
      };
    }
  } catch (error) {
    if (username) {
      return {
        contracts: null,
      };
    } else {
      return {
        contracts: defaultContracts,
      };
    }
  }
};

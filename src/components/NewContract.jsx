import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from "styled-components";
import {FaArrowLeft, FaPlus, FaMinus} from "react-icons/fa";
import {Box, Button, Flex, Text, Input} from "@blockstack/ui";
import {generateSmartContract} from "../api";


const Container = styled(Flex)`
  max-width: 1400px;
  width: 100%;
  margin: 75px auto 75px auto;
  flex-wrap: wrap;
`;

const Header = styled(Text)`
  font-size: 48px;
  font-family: "Rajdhani";
  font-weight: 600;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: #6b41e8;
  color: white;
`;



export const NewContract = () => {
    const history = useHistory();
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setDescription] = useState('');
    const [customType, setCustomType] = useState('');
    const [hasConditions, setHasConditions] = useState(false);
    const [parties, setParties] = useState(['']);
    const [conditions, setConditions] = useState([{}]);
    const [paymentAsset, setPaymentAsset] = useState('');
    const [completionBlock, setCompletionBlock] = useState('');

    const addCondition = () => {
        setConditions([...conditions, {}]);
    };

    const removeCondition = (index) => {
        const newConditions = [...conditions];
        newConditions.splice(index, 1);
        setConditions(newConditions);
    };

    const handleConditionChange = (field, value, index) => {
        const newConditions = [...conditions];
        newConditions[index][field] = value;
        setConditions(newConditions);
    };

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
        if (e.target.value === 'Other') {
            setCustomType('');
        }
    };

    const handleCustomTypeChange = (e) => {
        setCustomType(e.target.value);
    };

    const handleConditionToggle = (e) => {
        setHasConditions(e.target.value === 'Yes');
    };

    const addParty = () => {
        setParties([...parties, '']);
    };

    const removeParty = (index) => {
        const newParties = [...parties];
        newParties.splice(index, 1);
        setParties(newParties);
    };

    const handlePartyChange = (e, index) => {
        const newParties = [...parties];
        newParties[index] = e.target.value;
        setParties(newParties);
    };

    const handleGenerateContract = async () => {
        const payload = {
            type: selectedOption === 'Other' ? customType : selectedOption,
            description: description,
            parties: parties,
            conditions: conditions,
            payments: paymentAsset,
            completions: completionBlock
        }

        const response = await generateSmartContract(payload);
        console.log(response);
    }

    return (
        <Container>
            <Box width="100%">
                <StyledButton onClick={() => history.goBack()}>
                    <FaArrowLeft style={{marginRight: '8px'}}/>
                    Back
                </StyledButton>
            </Box>

            <Header>Create a New Contract</Header>

            <Box mb={4} width={"100%"} backgroundColor="#F4F1FD" borderRadius={10} padding={8} minHeight={200}>
                <Text as="label" fontSize="18" fontWeight="600" fontFamily="Rajdhani">Select a contract type</Text>

                {selectedOption !== 'Other' ? (
                    <Input as={"select"} value={selectedOption} onChange={handleSelectChange} borderRadius={12}
                           width={"100%"} height={50}>
                        <option value="">Select an option</option>
                        <option value="Business">Business</option>
                        <option value="Personal">Personal</option>
                        <option value="Financial">Financial</option>
                        <option value="Community">Community</option>
                        <option value="Other">Other (Specify)</option>
                    </Input>
                ) : (
                    <Box display="flex" justifyContent="space-between" width={"100%"}>
                        <Input as={"select"} value={selectedOption} onChange={handleSelectChange} borderRadius={12}
                               width={"48%"} height={50}>
                            <option value="">Select an option</option>
                            <option value="Business">Business</option>
                            <option value="Personal">Personal</option>
                            <option value="Financial">Financial</option>
                            <option value="Community">Community</option>
                            <option value="Other">Other (Specify)</option>
                        </Input>
                        <Input borderRadius={12} width={"48%"} height={50} placeholder="Type your custom contract type"
                               value={customType} onChange={handleCustomTypeChange}/>
                    </Box>
                )}

                <Box width={"100%"} mt={4}>
                    <Text as="label" fontSize="18" fontWeight="600" fontFamily="Rajdhani">Description</Text>
                    <Input borderRadius={12} width={"100%"} placeholder="Describe your contract"
                            value={description} onChange={e => setDescription(e.target.value)}/>
                </Box>


                {selectedOption &&
                    <Box mt={4}>
                        <Text as="label" fontSize="18" fontWeight="600" fontFamily="Rajdhani">Parties Involved</Text>
                        {parties.map((party, index) => (
                            <Box key={index} display={"flex"} width={"100%"} alignItems={"center"}
                                 justifyContent={"space-between"} mb={4}>
                                <Input borderRadius={12} width={"90%"} height={50}
                                       placeholder={`Stack ID of party ${index + 1}`} value={party}
                                       onChange={e => handlePartyChange(e, index)}/>
                                {index !== 0 &&
                                    <Button style={{backgroundColor: "#E84141", color: 'black', borderRadius: 180}}
                                            onClick={() => removeParty(index)}>
                                        <FaMinus/>
                                    </Button>
                                }

                                {index === parties.length - 1 &&
                                    <Button style={{backgroundColor: "#41E88F", color: 'black', borderRadius: 180}}
                                            onClick={addParty}>
                                        <FaPlus/>
                                    </Button>
                                }
                            </Box>
                        ))}

                        <Box display={"flex"} width={"100%"} alignItems={"center"} justifyContent={"space-between"}
                             mb={4}>
                            <Box width={"48%"}>
                                <Text as="label" fontSize="18" fontWeight="600" fontFamily="Rajdhani">Payment Asset</Text>
                                <Input borderRadius={12}
                                       width={"100%"}
                                       height={50}
                                       value={paymentAsset}
                                       onChange={e => setPaymentAsset(e.target.value)}
                                       placeholder="What asset will be used? (BTC, STX, etc.)"
                                />
                            </Box>
                            <Box width={"48%"}>
                                <Text as="label" fontSize="18" fontWeight="600" fontFamily="Rajdhani">Completion
                                    Block</Text>
                                <Input
                                    borderRadius={12}
                                    width={"100%"}
                                    height={50}
                                    value={completionBlock}
                                    onChange={e => setCompletionBlock(e.target.value)}
                                    placeholder="By which block number should the contract be completed?"/>
                            </Box>
                        </Box>

                        <Box width={"100%"} mb={4}>
                            <Text as="label" fontSize="18" fontWeight="600" fontFamily="Rajdhani">Add Conditions?</Text>
                            <Input as="select" onChange={handleConditionToggle} borderRadius={12} width={"100%"}
                                   height={50}>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </Input>
                        </Box>


                        {hasConditions && conditions.map((condition, index) => (
                            <Box key={index} display={"flex"} width={"100%"} alignItems={"center"}
                                 justifyContent={"flex-start"} mb={4}>
                                <Box width={"10%"} mr={4}>
                                    <Text as="label" fontSize={18} fontWeight={600} fontFamily={"Rajdhani"}>Type</Text>
                                    <Input borderRadius={12} width={"100%"} height={50} as="select"
                                           onChange={e => handleConditionChange('type', e.target.value, index)}>
                                        <option value="Time-based">Time-based</option>
                                        <option value="Event-based">Event-based</option>
                                        <option value="Oracle-based">Oracle-based</option>
                                        <option value="Custom">Custom</option>
                                    </Input>
                                </Box>
                                <Box width={"80%"}>
                                    <Text as="label" fontSize={18} fontWeight={600}
                                          fontFamily={"Rajdhani"}>Details</Text>
                                    <Input borderRadius={12} width={"100%"} height={50}
                                           placeholder="Please provide details for the chosen condition type."
                                           onChange={e => handleConditionChange('details', e.target.value, index)}/>
                                </Box>
                                <Box width={"10%"} alignItems={"center"} alignSelf={"flex-end"}>
                                    {index !== 0 &&
                                        <Button style={{backgroundColor: "#E84141", color: 'black', borderRadius: 180}}
                                                onClick={() => removeCondition(index)}>
                                            <FaMinus/>
                                        </Button>
                                    }

                                    {index === conditions.length - 1 &&
                                        <Button style={{
                                            backgroundColor: "#41E88F",
                                            color: 'black',
                                            borderRadius: 180,
                                            alignSelf: 'flex-end'
                                        }} onClick={addCondition}>
                                            <FaPlus/>
                                        </Button>
                                    }
                                </Box>

                            </Box>
                        ))}
                    </Box>
                }
                <Box width={"100%"} display={"flex"} justifyContent={'flex-end'}>
                    {selectedOption && parties.length > 1 && paymentAsset && completionBlock && (
                        <StyledButton style={{marginTop: '16px'}} onClick={handleGenerateContract}>
                            Generate Contract
                        </StyledButton>
                    )}
                </Box>

            </Box>
        </Container>
    );
};

import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Card from "./SortItem";
import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes";
import PropTypes from "prop-types";

const SortingList = (props) => {
    const [cards, setCards] = useState([...props.sortsArray]);

    const moveCard = (id, atIndex) => {
        const { card, index } = findCard(id);
        setCards(
            update(cards, {
                $splice: [
                    [index, 1],
                    [atIndex, 0, card]
                ]
            })
        );

        let values = [];
        let temp = [];
        temp = update(cards, {
            $splice: [
                [index, 1],
                [atIndex, 0, card]
            ]
        });
        temp.forEach((item) => {
            values.push(item.id);
        });
        props.handleReorderListOfSort(values);
    };

    const findCard = (id) => {
        const card = cards.filter((c) => `${c.id}` === id)[0];
        return {
            card,
            index: cards.indexOf(card)
        };
    };

    const [, drop] = useDrop({ accept: ItemTypes.CARD });

    React.useEffect(() => {
        setCards(props.sortsArray);
    }, [props.sortsArray]);

    return (
        <React.Fragment>
            <div ref={drop} style={{ display: "flex", flexWrap: "wrap" }}>
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        id={`${card.id}`}
                        text={card.text}
                        moveCard={moveCard}
                        findCard={findCard}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};

SortingList.propTypes = {
    sortsArray: PropTypes.any,
    handleReorderListOfSort: PropTypes.any
};

export default SortingList;

import React from "react";
import Card from "@material-tailwind/react/Card";
import CardRow from "@material-tailwind/react/CardRow";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardStatus from "@material-tailwind/react/CardStatus";
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
import Icon from "@material-tailwind/react/Icon";

export default function IconCard({friend}) {
    return (
        <Card>
            <CardRow>
                <CardHeader color="lightBlue" size="lg" iconOnly>
                    <Icon name="groups" size="5xl" color="white" />
                </CardHeader>

                <CardStatus title="Friends" amount={friend || 0} />
            </CardRow>

            <CardStatusFooter color="green" amount="97%" date="Since one week">
                <Icon color="green" name="arrow_upward" />
            </CardStatusFooter>
        </Card>
    );
}
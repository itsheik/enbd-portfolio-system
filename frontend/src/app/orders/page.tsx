import OrderForm from "./components/OrderForm";
import { SectionBanner, SectionContainer } from '~/components/sections'


export const metadata = { title: "Order Entry" };

export default function OrderEntryPage() {
    return (
        <div>
            <SectionBanner title="Order" />
            <SectionContainer className="space-y-8">
                <OrderForm />
            </SectionContainer>
        </div>
    );
}

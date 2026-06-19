import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckout = async(req,res) => {
   try{

     const {items} = req.body;
     
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid order details", success: false });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types : ["card"],
        mode:"payment",

        line_items : items.map((item) => ({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                    images:item.image,
                },
                unit_amount:item.price*100,
            },
            quantity:item.quantity,
        })),

        success_url:`${process.env.CLIENT_URL}/products`,
        success_url:`${process.env.CLIENT_URL}/products`

        
    })

        res.json({
            url:session.url
        })


   }catch(e){
    console.log(e);
    res.status(500).json({error:e.message})
   }
}


export const webhookController = async (req,res) => {
    try{

        const sig = req.headers["stripe-signature"];
        let event;

        try{
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.WEBHOOK_SECRET_KEY
            );
        }catch(e){
            return res.json(400).send(e.message);
        }

        if(event.type === "checkout.session.completed"){
            const session = event.data.object;
        }

        res.json({
            success:true,
            message:"order created",
            received:true
        })

    }catch(e){
         console.log(e);
         res.status(500).json({error:e.message})
    }
}
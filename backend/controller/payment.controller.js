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
                },
                unit_amount:item.price*100,
            },
            quantity:item.quantity,
        })),

        success_url:`${process.env.CLIENT_URL}/success`,
        success_url:`${process.env.CLIENT_URL}/cart`

        
    })

        res.json({
            url:session.url
        })


   }catch(e){
    console.log(e);
    res.status(500).json({error:e.message})
   }
}

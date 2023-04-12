require('dotenv').config()
const productsModel = require('../models/productModel')
const sellers = require('../models/SellerModel')

exports.productCreate = async (req, res) => {
    try {

        req.body.user = req.user._id
        const { name, category, description, price, stock, images } = req.body
        console.log(req.body)

        if (!name || !category || !description || !price || !stock || !images) {
            return res.status(422).send({ error: 'Invalid All feild' })
        }

        const product = new productsModel({ name, category, description, price, stock, images, user: req.body.user })
        await product.save();
        res.status(201).send({ success: true, product })

    } catch (error) {
        res.status(500).send({ error })
    }

}

// all sector role get product

//  admin all products <--
exports.adminProducts = async (req, res) => {
    try {
        const products = await productsModel.find();
        res.status(200).send({ success: true , products})
    } catch (error) {
        res.status(500).send({ error })
    }
}

//  seller all products <--
exports.sellerProducts = async (req, res) => {
    try {
        console.log('ap1')
        const sellerproducts = await productsModel.find({ user: req.user._id })
        console.log('ap3')
        res.status(200).json({ success: true, sellerproducts })
    } catch (error) {
        console.log('ap2')
        res.status(500).json({ error })
    }
}


// user single products
exports.singleProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productsModel.findById(id)
        const shop = await sellers.findOne({ user: product.user })
        if (!product) {
            return res.status(400).send({ error: 'product cannot exists' })
        }
        if (!shop) {
            return res.status(400).send({ error: 'shop cannot exists' })
        }
        res.status(200).send({ success: true, product, shop })

    } catch (error) {
        res.status(500).send({ error })
    }
}



//  product delete and update
exports.productDelete = async (req, res) => {
    const { id } = req.query
    const product = await productsModel.findById(id)

    if (!product) {
        return res.status(400).send({ error: 'product cannot exists' })
    }

    const deletedproduct = await productsModel.findByIdAndDelete(id)
    res.status(200).send({ deletedproduct })
}


exports.selleradminproductUpdate = async (req, res) => {
    try {
        const { name, category, description, price, stock, images } = req.body
        const { id } = req.query
        const product = await productsModel.findById(id)
        console.log(req.body)
        if (!product) {
            return res.status(422).send({ error: 'product cannot exists' })
        }
        const updatedproduct = await productsModel.findByIdAndUpdate(id, {
            name,
            category,
            price,
            stock,
            description,
            images,
        }, { new: true, runValidators: true, useFindAndModify: false })
        await updatedproduct.save()
        res.status(202).send({ success: true, updatedproduct })

    } catch (error) {
        res.status(500).send({ error })
    }
}


// reviews related work
exports.productreview = async (req, res) => {
    try {

        const { id } = req.query
        console.log(req.body)
        console.log(id)
        const { rating, comment, images } = req.body
        const product = await productsModel.findById(id)
        let avarage = 0;

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
            images,
            avatar: req.user.avatar
        }

        if (!product) {
            return res.status(400).send({ error: 'product cannot exists' })
        }

        const alreadyReview = await product.reviews.find((review) => review.user.toString() === req.user._id.toString())

        if (alreadyReview) {
            let avarage = 0;
            product.reviews.map((reviewSingle) => {
                if (reviewSingle.user.toString() === req.user._id.toString()) {
                    reviewSingle.rating = rating
                    reviewSingle.comment = comment
                    reviewSingle.images = images
                    product.reviews.map((review) => {
                        avarage += review.rating
                    })
                    return product.ratings = avarage / product.reviews.length
                }
            })
            await product.save({ validateBeforeSave: false })
            return res.status(201).send({ success: true, product })

        }

        
        product.reviews.push(review)
        product.numberofreviews = product.reviews.length
        product.reviews.map((review) => { avarage += review.rating })
        product.ratings = avarage / product.reviews.length
        await product.save({ validateBeforeSave: false })
        res.status(201).send({ success: true, product })

    } catch (error) {
        res.status(500).send({ error })
    }
}



// shop get
exports.shopget = async (req, res) => {
    const { id } = req.params
    console.log(1)
    const shop = await sellers.findOne({user : id})
    console.log(2 + 'yy')
    const allproduct = await products.find({ user: shop.user })
    console.log(2 + 'yyy')

    res.status(200).send({ success: true, shop, allproduct })
}

exports.getAllreviews = async (req, res) => {
    try {
        const product = await productsModel.findById(req.query.id)
        if (!product) {
            return res.send(`${req.query.id} product not found`)
        }
    
        res.status(200).send({ success: true, reviews: product.reviews })
        
    } catch (error) {
        res.send({ success : false , error : 'Product Id Roung Try Again'} )
    }
}


// delete reviews
exports.deleteReviews = async (req, res) => {

    const product = await productsModel.findById(req.query.productId)

    if (!product) {
        return res.send({ msg: 'review not found' })
    }

    const reviews = product.reviews.filter((reviews) => reviews._id.toString() !== req.query.id.toString())

    let avg = 0

    reviews.map((item) => {
        avg += item.rating
    })

    const ratings = avg / reviews.length

    const numOfReviews = reviews.length

    await productsModel.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    }, { new: true, runValidators: true, useFindAndModify: false })

    res.status(200).send({
        msg: "delete successful",
        review: reviews
    })
}


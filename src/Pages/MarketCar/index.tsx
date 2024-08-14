'use client'
import React, { useState } from 'react'
import '../MarketCar/marketcar.css'

interface IProdutos {
    id: number,
    titulo: string,
    preco: number,
  
    
}

interface IShoppingItem {
    produto: IProdutos,
    quantidade: number
}

const produtos: IProdutos[] = [
    { id: 1, titulo: 'Suco', preco: 15.00 , },
    { id: 2, titulo: 'Refrigerante', preco: 20.00 },
    { id: 3, titulo: 'Batata frita', preco: 120.00 },
    { id: 4, titulo: 'Hamburguer', preco: 1000.00 },
    { id: 5, titulo: 'Pizza', preco: 56.00 },
    { id: 6, titulo: 'Cachorro Quente', preco: 10.00 },
    { id: 7, titulo: 'Sanduíche Natural', preco: 25.00 },
  
]

const formatPreco = (preco: number): string => preco.toFixed(2);

const MarketCarPages = () => {
    const [shoppingFarmacia, setShoppingFarmacia] = useState<IShoppingItem[]>([]);

    const handleAddFarmacia = (id: number) => {
        const produto = produtos.find((produto) => produto.id === id);
        if (!produto) return; // Early return if produto is not found

        setShoppingFarmacia(prevState => {
            const produtoExisteShopping = prevState.find(item => item.produto.id === id);

            if (produtoExisteShopping) {
                return prevState.map(item =>
                    item.produto.id === id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            } else {
                const carItem: IShoppingItem = {
                    produto: produto,
                    quantidade: 1
                };
                return [...prevState, carItem];
            }
        });
    };

    const handleRemoveFarmacia = (id: number) => {
        setShoppingFarmacia(prevState => {
            const itemToRemove = prevState.find(item => item.produto.id === id);
            if (!itemToRemove) return prevState; // Early return if item to remove is not found

            if (itemToRemove.quantidade > 1) {
                return prevState.map(item =>
                    item.produto.id === id
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                );
            } else {
                return prevState.filter(item => item.produto.id !== id);
            }
        });
    };

    const totalProduto = shoppingFarmacia.reduce((total, item) => {
        return total + (item.produto.preco * item.quantidade);
    }, 0);

    return (
        <div className='container'>
            <nav className='navbar'>
                <ul className='navbar-menu'>
                   
                    <li><a href='#Ifood'>Ifood</a></li>
                    
                </ul>
            </nav>
            
            <h1>Itens</h1>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        <div className='item-details'>
                            <p>{produto.titulo}</p>
                            <p>Preço: R${formatPreco(produto.preco)}</p>
                        </div>
                        <button className='add-button' type="button" onClick={() => handleAddFarmacia(produto.id)}>Adicionar</button>
                    </li>
                ))}
            </ul>

            <div className='total-container'>
                Carrinho de Compras: (R$ {formatPreco(totalProduto)})
            </div>

            <ul>
                {shoppingFarmacia.map(item => (
                    <li key={item.produto.id}>
                        <div className='item-details'>
                            <p>Título: {item.produto.titulo}</p>
                            <p>Preço: R$ {formatPreco(item.produto.preco)}</p>
                            <p>Quantidade: {item.quantidade}</p>
                            <p>Total: R$ {formatPreco(item.produto.preco * item.quantidade)}</p>
                        </div>
                        <button className='remove-button' onClick={() => handleRemoveFarmacia(item.produto.id)}>Remover</button>
                    </li>
                ))}
            </ul>


            
        </div>
    );
}

export default MarketCarPages;
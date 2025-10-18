'use client'

import { customCheckbox, title } from '@/components/primitives'
import { Button } from '@heroui/button'
import { Input, Textarea } from '@heroui/input'
import { Checkbox } from '@heroui/checkbox'
import Link from 'next/link'
import { useState } from 'react'
import { ReactSelect } from '@/components/React-MultiSelect'
import Dropzone from '@/components/React-Dropzone'
import { cn } from '@/config/utils'

interface OptionType {
  label: string
  value: string
}

export default function BlogPage() {
  const [discountChecked, setDiscountChecked] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [selectedCaracteristics, setSelectedCaracteristics] = useState<
    OptionType[]
  >([])
  const [form, setForm] = useState({
    title: '',
    price: '',
    discount: '',
    description: '',
    note: '',
    review: '',
    tags: '',
    profits: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const optionsCaracteristics = [
    {
      value: 'Disponible en vert et en bleu',
      label: 'Disponible en vert et en bleu',
    },
    { value: 'Recharge sans fil', label: 'Recharge sans fil' },
    { value: 'Chargeur USB-C', label: 'Chargeur USB-C' },
    { value: "13h d'autonomie", label: "13h d'autonomie" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (files.length === 0) {
      alert('Aucun fichier sélectionné !')
      return
    }

    // Création du FormData
    const formData = new FormData()

    // Ajouter les fichiers
    files.forEach((file) => {
      formData.append('files', file)
    })
    const valuesCaracteristics = selectedCaracteristics.map((c) => c.value)
    formData.append('caracteristics', JSON.stringify(valuesCaracteristics))

    // // Ajouter d'autres champs texte
    formData.append('title', form.title)
    formData.append('price', form.price)
    formData.append('discount', form.discount)
    formData.append('description', form.description)
    formData.append('note', form.note)
    formData.append('review', form.review)
    formData.append('tags', form.tags)
    formData.append('profits', form.profits)

    try {
      const res = await fetch('/api/article', {
        method: 'POST',
        body: formData, // ✅ multipart/form-data
      })

      if (res.ok) {
        const data = await res.json()
        console.log('Upload réussi :', data)
        alert('Fichiers envoyés !')
      } else {
        console.error('Erreur serveur :', await res.text())
      }
    } catch (error) {
      console.error('Erreur réseau :', error)
    }
  }

  return (
    <>
      <div className="text-small text-gray-700 py-3 px-6 max-w-6xl mx-auto box-border dark:text-dark-text mt-[80px] lg:mt-auto">
        <Link
          href="/"
          title="Mazou Homepage"
          className="hover:text-brand-primary-400"
        >
          {'<'} Retourner à l'acceuil
        </Link>
      </div>
      <div className="mz_container">
        <div className="mz_container-body mz_container-resp">
          <div className="mz_container-bloc">
            <h1 className={title()}>Dashboard</h1>
          </div>
          <div className="mz_container-bloc">
            <h3 className="mz_Heading">Ajouter un article</h3>
            <form onSubmit={handleSubmit} className="space-y-2">
              <Input
                type="text"
                isRequired
                label="Titre"
                autoFocus
                size="lg"
                name="title"
                value={form.title}
                onChange={handleChange}
                errorMessage="Remplissez ce champ correctement"
              />
              <Input
                type="number"
                isRequired
                label="Prix"
                size="lg"
                name="price"
                step={100}
                value={form.price}
                onChange={handleChange}
              />
              <div className="mx-4 flex flex-col gap-1">
                {/* <input
                  type="checkbox"
                  id="priceDiscount"
                  onChange={handleDiscount}
                  checked={discountChecked}
                />
                <label htmlFor="priceDiscount">Réduction de prix</label> */}
                <Checkbox
                  defaultSelected
                  isSelected={discountChecked}
                  onValueChange={setDiscountChecked}
                  classNames={{ wrapper: `after:bg-brand-primary-400` }}
                >
                  Réduction de prix
                </Checkbox>
                <Input
                  type="number"
                  isRequired
                  label="Prix Avant Réduction"
                  size="lg"
                  name="discount"
                  step={100}
                  isDisabled={!discountChecked}
                  value={form.discount}
                  onChange={handleChange}
                />
              </div>
              <Textarea
                rows={10}
                label="Description"
                size="lg"
                name="description"
                value={form.description}
                onChange={handleChange}
              ></Textarea>
              <Input
                type="number"
                isRequired
                label="Note Produit"
                size="lg"
                name="note"
                max={5}
                min={1}
                value={form.note}
                onChange={handleChange}
              />
              <Input
                type="number"
                isRequired
                label="Nombre d'avis"
                size="lg"
                name="review"
                value={form.review}
                onChange={handleChange}
              />
              <hr className="my-6" />
              <Input
                type="text"
                label="Tags du produit"
                size="lg"
                name="tags"
                value={form.tags}
                onChange={handleChange}
              />
              <Input
                type="text"
                label="Avantage du produit"
                size="lg"
                name="profits"
                value={form.profits}
                onChange={handleChange}
              />
              <hr className="my-6" />
              <ReactSelect
                options={optionsCaracteristics}
                value={selectedCaracteristics}
                onChange={setSelectedCaracteristics}
              />
              {/* <Input
                type="text"
                label="Caractéristique de produit"
                size="lg"
                name="title"
              /> */}
              {/* <Button
                variant="bordered"
                size="md"
                className="mz_dark-btn"
                startContent={<PlusIcon className="w-4 h-4" />}
              >
                Ajouter
              </Button> */}
              <hr className="my-6" />
              <div className="mb-2 text-gray-500 dark:text-gray-400 font-medium">
                Images du produit
              </div>
              <Dropzone onFilesChange={setFiles} />
              <div className="mt-10">
                <Button type="submit" className="mz_btn-submit" size="lg">
                  Ajouter un article
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
